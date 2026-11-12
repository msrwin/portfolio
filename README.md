# 佐藤 勝 / 開発ポートフォリオ

公開サイト: https://msrwin.github.io/portfolio/

面接・カジュアル面談向けに、製造現場の課題解決実績を整理した静的サイトです。  
一覧では氏名を先頭に明示し、代表実績3件を中心に、課題 → 対応 → 工夫の順で読める構成にしています。  
専門用語は、一般の人にも意味が伝わる呼び方へ寄せています。

## 自己紹介

佐藤 勝。品質保証部門向け業務システムを中心に、要件定義・設計・開発・テスト・導入・保守まで一貫して担当しています。  
品質保証として分析業務の傍ら、業務要件を理解し、現場で継続して利用できるシステムを設計することを重視しています。

- SQL Server・FastAPI・React・PyQt を用いて、現場の業務改善を目的としたシステムを設計・開発（社内技術発表会での発表経験あり）
- Cursor を中心とした AI エージェントを活用し、Claude・ChatGPT・Gemini・GitHub Copilot・CodeRabbit を組み合わせて実装・レビュー・設計検証を実施
- 定期的なリファクタリングに加え、共通処理の集約や設定ファイルの外部化により、保守性・拡張性・再利用性を意識した設計を継続

AI を活用した開発を前提に、現場の課題を理解し、設計から運用まで一貫して価値を提供できる DX エンジニアを目指しています。

## 閲覧方法

### 一覧ページ

```powershell
Start-Process ".\index.html"
```

### 詳細ページ

各プロジェクトの「詳細を見る」から遷移できます。詳細ページには、面接で話すポイントも載せています。

```text
project.html?id=equipment-management
project.html?id=uwave-relay
project.html?id=analysis-measurement-storage
```

> **注意:** 詳細ページは `projects-detail.json` を fetch するため、`file://` 直開きで CORS エラーになる場合があります。その場合は簡易 HTTP サーバーで起動してください。

```powershell
cd "<portfolio folder>"
py -3 -m http.server 8080
# ブラウザで http://localhost:8080 を開く
```

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `index.html` | 面接向け一覧（自己紹介・代表3件・その他） |
| `project.html` | プロジェクト詳細ページ |
| `projects-detail.json` | 詳細データ（impact / interview_talking_points 含む） |
| `project-detail.js` | 詳細ページ描画 |
| `styles.css` | スタイル |
| `script.js` | 一覧ページの挙動 |
| `projects.json` | 選定一覧（機械可読） |
| `screenshots/` | 画面キャプチャ |
| `tools/build_screenshots_manifest.py` | スクリーンショット一覧生成 |

## 面接での使い方（推奨）

1. 自己紹介（品質保証 × 業務システム、要件〜保守）
2. 社内発表資料（測定記録デジタル化の全体ストーリー）
3. 代表作1: 測定機器管理台帳（Desktop/Web 共有ロジック）
4. 代表作2: 測定器データ中継（物理制約を分散構成で解く）
5. 代表作3: 分析測定結果保存（現場入力と証跡の両立）
6. 必要に応じて MeasureCOM / 汎用機能集 / OCR へ展開

### 発表資料

- ファイル: `assets/presentations/DX発表.pptx`
- 社内発表会向け資料の公開版です。社外秘の実データ画像・動画は外し、発表構成が分かる形で掲載しています。

## 選定プロジェクト（概要）

最終更新: 2026-11-12

### 代表実績
- 測定機器の管理台帳システム
- 共有測定器のデータを複数PCへ届ける中継システム
- 分析室の測定結果を保存・管理するシステム

### 補足実績
- 測定器連携: 測定値の自動入力、硬度計校正、針検出、無線硬度計、軟化点、音声入力
- 読み取り/文書: 手書き測定表読取、社内文書AI、Excel翻訳、PDF→Excel
- 基盤: 共通部品集、実行ファイル化工具、図面系、使用量見える化

## カスタマイズ

- 氏名・連絡先は `index.html` の hero / contact を編集（現在は「佐藤 勝」）
- プロジェクト詳細は `projects-detail.json` を編集
- スクリーンショット追加後は `py -3 tools/build_screenshots_manifest.py` を実行
- 社外公開で伏せたい情報があれば `projects-detail.json` の説明文を調整
