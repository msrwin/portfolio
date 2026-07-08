const TIER_LABELS = {
  flagship: "Flagship",
  technical: "Technical",
  iot: "IoT",
  tooling: "Tooling",
};

function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderList(items, className = "feature-list") {
  if (!items || items.length === 0) return "";
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderTags(items) {
  if (!items || items.length === 0) return "";
  return `<div class="tech-tags">${items.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`;
}

function renderOverview(paragraphs) {
  if (!paragraphs || paragraphs.length === 0) return "";
  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function renderFileStructure(fs) {
  if (!fs) return "";
  let html = '<div class="file-structure">';
  if (fs.main_entry) {
    html += `<div class="fs-row"><span class="fs-label">エントリ</span><code>${escapeHtml(fs.main_entry)}</code></div>`;
  }
  if (fs.key_dirs && fs.key_dirs.length > 0) {
    html += `<div class="fs-row"><span class="fs-label">主要ディレクトリ</span><div class="fs-dirs">${fs.key_dirs.map((d) => `<code>${escapeHtml(d)}</code>`).join("")}</div></div>`;
  }
  if (fs.config) {
    html += `<div class="fs-row"><span class="fs-label">設定</span><code>${escapeHtml(fs.config)}</code></div>`;
  }
  html += "</div>";
  return html;
}

function renderRelated(projects, allProjects) {
  if (!projects || projects.length === 0) return "<p class='muted'>なし</p>";
  return `<div class="related-links">${projects
    .map((name) => {
      const match = allProjects.find((p) => p.repo === name || name.includes(p.repo) || p.name === name);
      if (match) {
        return `<a href="project.html?id=${match.id}" class="related-link">${escapeHtml(match.name)}</a>`;
      }
      return `<span class="related-link muted">${escapeHtml(name)}</span>`;
    })
    .join("")}</div>`;
}

function renderGallery(images) {
  if (!images || images.length === 0) return "";

  return `
    <div class="detail-block">
      <h2>スクリーンショット</h2>
      <div class="gallery">
        ${images
          .map((img) => {
            const src = escapeHtml(img.src);
            const alt = escapeHtml(img.alt || img.caption || "screenshot");
            const cap = escapeHtml(img.caption || "");
            return `
              <figure class="gallery-item">
                <a href="${src}" target="_blank" rel="noopener noreferrer">
                  <img class="gallery-img" src="${src}" alt="${alt}" loading="lazy" />
                </a>
                ${cap ? `<figcaption class="gallery-cap">${cap}</figcaption>` : ""}
              </figure>
            `;
          })
          .join("")}
      </div>
      <p class="muted gallery-note">クリックで原寸表示できます。</p>
    </div>
  `;
}

function renderProject(project, allProjects) {
  const tierLabel = TIER_LABELS[project.tier] || project.tier;
  const versionBadge = project.version
    ? `<span class="card-version">v${escapeHtml(project.version)}</span>`
    : "";

  document.title = `${project.name} | 開発ポートフォリオ`;

  const images = (project.assets && project.assets.screenshots) || [];

  return `
    <article class="detail-page">
      <section class="detail-hero">
        <div class="container">
          <div class="detail-breadcrumb">
            <a href="index.html">Portfolio</a>
            <span>/</span>
            <span>${escapeHtml(project.name)}</span>
          </div>
          <div class="detail-hero-meta">
            <span class="tier-badge tier-${project.tier === "flagship" ? "1" : project.tier === "technical" ? "2" : project.tier === "iot" ? "3" : "4"}">${tierLabel}</span>
            ${versionBadge}
            <span class="card-category">${escapeHtml(project.repo)}</span>
          </div>
          <h1>${escapeHtml(project.name)}</h1>
          <p class="detail-tagline">${escapeHtml(project.tagline)}</p>
          ${renderTags(project.tech_stack)}
        </div>
      </section>

      <section class="detail-section">
        <div class="container detail-grid">
          <div class="detail-main">
            <div class="detail-block">
              <h2>概要</h2>
              <div class="detail-text">${renderOverview(project.overview)}</div>
            </div>

            <div class="detail-block problem-solution">
              <div class="ps-card">
                <h3>課題</h3>
                <p>${escapeHtml(project.problem)}</p>
              </div>
              <div class="ps-card ps-solution">
                <h3>解決策</h3>
                <p>${escapeHtml(project.solution)}</p>
              </div>
            </div>

            <div class="detail-block">
              <h2>主な機能</h2>
              ${renderList(project.features)}
            </div>

            ${renderGallery(images)}

            <div class="detail-block">
              <h2>アーキテクチャ</h2>
              <pre class="arch-diagram detail-diagram">${escapeHtml(project.architecture)}</pre>
            </div>

            <div class="detail-block">
              <h2>技術的ハイライト</h2>
              ${renderList(project.highlights, "highlight-list")}
            </div>

            <div class="detail-block">
              <h2>克服した課題</h2>
              ${renderList(project.challenges, "challenge-list")}
            </div>
          </div>

          <aside class="detail-sidebar">
            <div class="sidebar-card">
              <h3>リポジトリ</h3>
              <p class="sidebar-repo"><code>${escapeHtml(project.repo)}</code></p>
            </div>

            <div class="sidebar-card">
              <h3>ファイル構成</h3>
              ${renderFileStructure(project.file_structure)}
            </div>

            <div class="sidebar-card">
              <h3>テスト</h3>
              <p>${escapeHtml(project.testing)}</p>
            </div>

            <div class="sidebar-card">
              <h3>配布</h3>
              <p>${escapeHtml(project.distribution)}</p>
            </div>

            <div class="sidebar-card">
              <h3>関連プロジェクト</h3>
              ${renderRelated(project.related_projects, allProjects)}
            </div>

            <a class="btn-primary btn-block" href="index.html#projects">一覧に戻る</a>
          </aside>
        </div>
      </section>

      <section class="detail-nav-section">
        <div class="container detail-nav" id="detail-nav"></div>
      </section>
    </article>
  `;
}

function renderNav(currentId, allProjects) {
  const tiers = ["flagship", "technical", "iot", "tooling"];
  const tierNames = { flagship: "代表作", technical: "AI・OCR", iot: "IoT", tooling: "ツール" };
  let html = "";

  tiers.forEach((tier) => {
    const items = allProjects.filter((p) => p.tier === tier);
    if (items.length === 0) return;
    html += `<div class="nav-tier"><h4>${tierNames[tier]}</h4><div class="nav-tier-links">`;
    items.forEach((p) => {
      const active = p.id === currentId ? " active" : "";
      html += `<a href="project.html?id=${p.id}" class="nav-project-link${active}">${escapeHtml(p.name)}</a>`;
    });
    html += "</div></div>";
  });

  return html;
}

function renderNotFound(id) {
  document.title = "プロジェクトが見つかりません | 開発ポートフォリオ";
  return `
    <div class="container not-found">
      <h1>プロジェクトが見つかりません</h1>
      <p>ID: <code>${escapeHtml(id || "(未指定)")}</code></p>
      <a class="btn-primary" href="index.html">ポートフォリオ一覧に戻る</a>
    </div>
  `;
}

async function init() {
  const root = document.getElementById("project-root");
  const id = getProjectId();

  try {
    const response = await fetch("projects-detail.json");
    if (!response.ok) throw new Error("データの読み込みに失敗しました");
    const data = await response.json();
    const projects = data.projects || [];
    const project = projects.find((p) => p.id === id);

    if (!project) {
      root.innerHTML = renderNotFound(id);
      return;
    }

    // Optional: screenshots manifest (generated locally and committed)
    try {
      const manifestRes = await fetch("screenshots/manifest.json");
      if (manifestRes.ok) {
        const manifest = await manifestRes.json();
        const byProject = (manifest && manifest.by_project) || {};
        const imgs = byProject[project.id] || [];
        if (imgs.length > 0) {
          project.assets = project.assets || {};
          project.assets.screenshots = imgs;
        }
      }
    } catch {
      // ignore (no screenshots yet)
    }

    root.innerHTML = renderProject(project, projects);

    const navEl = document.getElementById("detail-nav");
    if (navEl) {
      navEl.innerHTML = renderNav(id, projects);
    }

    document.querySelectorAll(".detail-block, .sidebar-card").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  } catch (err) {
    root.innerHTML = `
      <div class="container not-found">
        <h1>読み込みエラー</h1>
        <p>${escapeHtml(err.message)}</p>
        <p class="muted">ローカルファイルとして開いている場合、HTTP サーバー経由でアクセスしてください。</p>
        <a class="btn-primary" href="index.html">ポートフォリオ一覧に戻る</a>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", init);
