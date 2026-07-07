# 開発ポートフォリオ

`c:\Users\m-sato\Desktop\python` 配下の各リポジトリを調査し、ポートフォリオに掲載するアプリを抽出した静的サイトです。

## 閲覧方法

ブラウザで `index.html` を開いてください。

```powershell
Start-Process "c:\Users\m-sato\Desktop\python\portfolio\index.html"
```

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `index.html` | ポートフォリオ本体 |
| `styles.css` | スタイル |
| `script.js` | スクロールアニメーション等 |
| `projects.json` | 選定基準・プロジェクト一覧（機械可読） |

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
- スクリーンショットを追加する場合は `portfolio/assets/` を作成し、各 `project-card` に `<img>` を追加
- 社外公開用に社名・機密情報を伏せる場合は各カードの説明文を調整
