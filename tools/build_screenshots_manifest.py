from __future__ import annotations

import json
import os
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass(frozen=True)
class ImageItem:
    src: str
    alt: str
    caption: str


VALID_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def _caption_from_stem(stem: str) -> str:
    # e.g. "equipment-management__login_screen" -> "login screen"
    if "__" not in stem:
        return stem.replace("_", " ").strip()
    _, rest = stem.split("__", 1)
    return rest.replace("_", " ").strip() or stem


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    screenshots_dir = root / "screenshots"
    out_path = screenshots_dir / "manifest.json"

    screenshots_dir.mkdir(parents=True, exist_ok=True)

    by_project: dict[str, list[ImageItem]] = {}
    misc: list[ImageItem] = []

    for p in sorted(screenshots_dir.glob("*")):
        if not p.is_file():
            continue
        if p.suffix.lower() not in VALID_EXTS:
            continue

        stem = p.stem
        rel_src = f"screenshots/{p.name}"
        caption = _caption_from_stem(stem)

        if "__" in stem:
            project_id, _ = stem.split("__", 1)
            by_project.setdefault(project_id, []).append(
                ImageItem(src=rel_src, alt=caption, caption=caption)
            )
        else:
            misc.append(ImageItem(src=rel_src, alt=caption, caption=caption))

    # JSON serializable
    payload = {
        "generated_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "n_images": sum(len(v) for v in by_project.values()) + len(misc),
        "by_project": {
            k: [item.__dict__ for item in v]
            for k, v in sorted(by_project.items(), key=lambda kv: kv[0])
        },
        "misc": [item.__dict__ for item in misc],
        "naming_rule": "screenshots/<projectId>__<screen>.png (例: equipment-management__login.png)",
    }

    # Ensure stable newlines for GitHub diff
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote: {out_path}  (n_images={payload['n_images']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

