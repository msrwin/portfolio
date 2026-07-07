# 開発ポートフォリオ

`c:\Users\m-sato\Desktop\python` 配下の各リポジトリを調査し、ポートフォリオに掲載するアプリを抽出した静的サイトです。

## 自己紹介

品質保証部門向け業務システムを中心に、要件定義・設計・開発・テスト・導入・保守まで一貫して担当しています。  
品質保証として分析業務の傍ら、業務要件を理解し、現場で継続して利用できるシステムを設計することを重視しています。

- SQL Server・FastAPI・React・PyQt を用いて、現場の業務改善を目的としたシステムを設計・開発（社内技術発表会での発表経験あり）
- Cursor を中心とした AI エージェントを活用し、Claude・ChatGPT・Gemini・GitHub Copilot・CodeRabbit を組み合わせて実装・レビュー・設計検証を実施
- 定期的なリファクタリングに加え、共通処理の集約や設定ファイルの外部化により、保守性・拡張性・再利用性を意識した設計を継続

AI を活用した開発を前提に、現場の課題を理解し、設計から運用まで一貫して価値を提供できる DX エンジニアを目指しています。

## 閲覧方法

### 一覧ページ

```powershell
Start-Process "c:\Users\m-sato\Desktop\python\portfolio\index.html"
```

### 詳細ページ

各プロジェクトカードの「詳細を見る →」リンクから遷移できます。

直接 URL で開く例:

```text
project.html?id=equipment-management
project.html?id=shaft-ring-ocr
project.html?id=uwave-relay
```

> **注意:** 詳細ページは `projects-detail.json` を fetch するため、`file://` 直開きで CORS エラーになる場合があります。その場合は簡易 HTTP サーバーで起動してください。

```powershell
cd "c:\Users\m-sato\Desktop\python\portfolio"
py -3 -m http.server 8080
# ブラウザで http://localhost:8080 を開く
```

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `index.html` | ポートフォリオ一覧 |
| `project.html` | プロジェクト詳細ページ（テンプレート） |
| `projects-detail.json` | 全16プロジェクトの詳細データ |
| `project-detail.js` | 詳細ページの描画ロジック |
| `styles.css` | スタイル |
| `script.js` | 一覧ページのスクロールアニメーション等 |
| `projects.json` | 選定基準・プロジェクト一覧（機械可読） |

## 詳細ページの内容（各プロジェクト）

- 概要・課題・解決策
- 主な機能一覧
- アーキテクチャ図
- 技術的ハイライト・克服した課題
- ファイル構成・テスト・配布情報
- 関連プロジェクトへのリンク
- 他プロジェクトへのナビゲーション

## 選定プロジェクト（概要）

### Flagship（代表作）
- 測定機器管理台帳システム（管理台帳_統合版）v3.0.2
- U-WAVE 中継システム（U-WAVE分岐送信）v1.1.x
- 分析測定結果保存（TP / CTE / VM）v1.0.x

### Technical（AI・OCR）
- 軸受リング OCR → Excel（shaft_ring_ocr）v1.1.11
- RAG System（RAG）
- Excel 翻訳ツール（Excel翻訳）
- PDF → Excel 変換（PDF→EXCEL変換）

### IoT・リアルタイム
- ショア硬度計 針検出（NeedleDetection）
- TIME5370 データ取得（BLE）
- 軟化点データ取得（TCP/Telnet）
- 音声入力 HID（Voice_HID）

### Tooling
- pyファイル exe 化ツール
- 汎用機能集
- 図番 PDF 管理ソフト
- 図面編集ツール
- Cursor 使用量ダッシュボード

## カスタマイズ

- 氏名・連絡先を追加する場合は `index.html` の hero セクションを編集
- プロジェクト詳細を更新する場合は `projects-detail.json` を編集
- スクリーンショットを追加する場合は `portfolio/assets/` を作成し、詳細ページに画像セクションを追加
- 社外公開用に社名・機密情報を伏せる場合は `projects-detail.json` の説明文を調整
