# TODO検索アプリ

## 概要
- `backend-app` は Express + Sequelize で構築した REST API。PostgreSQL を想定し、Todo（`id`, `title`, `tag`, `content`）の CRUD とページング・簡易サーチを提供。
- `frontend-app` は Vite + React 19 + PrimeReact。React Query と Jotai を使い、API と連携した一覧表示、検索、ページング、追加/編集/削除をサポート。
- `.env` と `.env` (frontend) で接続先とページサイズを切り替え可能。
- ロギング（Pino）とレートリミット（10 req/sec, /v1 配下）が有効。

## ディレクトリ
- `backend-app/src` … `app.js`（ミドルウェア設定）、`routes/todoRoute.js`（REST ルート）、`controllers`/`services`（業務ロジック）、`models/todoModel.js`（Sequelize モデル）、`utils`（DB/ログ/エラーハンドラ/RateLimit）、`scripts/seed.js`（初期データ投入）。
- `frontend-app/src` … React コンポーネント（`TodoList`/`TodoDialog` など）、状態管理（`atoms`）、API クライアント（`service/apiTodo.ts`）、フック群（`hooks/todo/*`）、スタイル（`assets`）。

## 動作要件
- Node.js 18 以上推奨
- pnpm 10 系（`packageManager: pnpm@10.6.5` 記載）
- PostgreSQL（ローカルで `DB_HOST=localhost` 前提の `.env` あり）

## セットアップ & 起動
1) リポジトリ直下でそれぞれ依存を導入  
```bash
cd backend-app && pnpm install
cd ../frontend-app && pnpm install
```

2) バックエンド環境変数（`backend-app/.env`）を確認・編集  
```
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```
必要に応じて DB を作成し、PostgreSQL を起動しておく。

3) サンプルデータ投入（任意）  
```bash
cd backend-app
pnpm seed   # src/scripts/data/initData.json を todo テーブルに全件投入（force sync）
```

4) バックエンドを起動  
```bash
cd backend-app
pnpm dev    # nodemon + pino-pretty, http://localhost:3000
```

5) フロントエンド環境変数（`frontend-app/.env`）を確認  
```
VITE_BASE_URL=http://localhost:3000/v1/todos
VITE_PAGE_SIZE=5
```

6) フロントエンドを起動  
```bash
cd frontend-app
pnpm dev    # デフォルト http://localhost:5173
```

## API（/v1 プレフィックス）
- `GET /todos?page={n}&limit={n}&search={text}`: Todo 一覧取得（ページング/タイトル検索）。レスポンス `{ message, data: Todo[] }`
- `GET /todos/{todoId}`: 単一取得。`data: Todo`
- `POST /todos`: 新規作成。Body: `{ id, title, tag, content }`
- `PATCH /todos`: 更新。Body: `{ id, title?, tag?, content? }`
- `DELETE /todos/{todoId}`: 削除
- `GET /todos/count?search={text}`: 件数取得（ページネーション用）
- 共通レスポンス: `message` と `data`（存在する場合）。見つからない場合は 404。
- レートリミット: `/v1` へのリクエストは 1 秒 10 件まで。
- ログ出力: `src/logs/all-logs.log` ほか warn/error 専用ファイルを Pino が生成。

## フロントエンド挙動
- 検索バー（Menubar 内 InputText）入力 → React Query のクエリキーに反映し、`search` クエリ付きで再取得。
- DataView にカード表示（PrimeReact）。削除ボタンで API 呼び出し → React Query のキャッシュ無効化。
- `Add` ボタン、または各行の編集ボタンで `TodoDialog` を表示。Add/Update はフォーム送信で POST/PATCH。完了時は Toast 通知。
- ページネーション: `Paginator` が `/todos/count` を参照し、`VITE_PAGE_SIZE` を行数として切り替え。
- 状態管理: Jotai（ローディング状態、編集対象、ダイアログ表示フラグなど）、React Query（サーバー状態）で分離。

## よくある作業
- モデル定義: `backend-app/src/models/todoModel.js`（テーブル名 `todo`, timestamp 無効）。ID はクライアント生成の数値/文字列を想定。
- 初期データ編集: `backend-app/src/scripts/data/initData.json` を修正して `pnpm seed`。
- アーキ図: `backend-app/architecture.png`（参考）。

## トラブルシュートのヒント
- DB 接続確認: サーバー起動時に `✅ Connection has been established successfully.` が出ない場合、`.env` と DB 起動状態を確認。
- CORS/ポート衝突: フロントとバックのポートが競合しないように `PORT` を調整。
- ログ: 問題発生時は `backend-app/src/logs/*.log` を参照。
