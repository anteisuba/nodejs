# TODO 搜索应用

## 概要
- `backend-app`：Express + Sequelize 的 REST API（PostgreSQL 预设），提供 Todo（`id`, `title`, `tag`, `content`）的 CRUD、分页与搜索。
- `frontend-app`：Vite + React 19 + PrimeReact；用 React Query + Jotai 做服务端/本地状态管理，支持列表、搜索、分页、添加/编辑/删除。
- 环境变量可在后端/前端的 `.env` 中切换；后端启用 Pino 日志与 1 秒 10 次的 `/v1` 速率限制。

## 目录结构
- `backend-app/src`：`app.js`（中间件）、`routes/todoRoute.js`（路由）、`controllers`/`services`（业务逻辑）、`models/todoModel.js`（Sequelize 模型）、`utils`（DB/日志/错误/限流）、`scripts/seed.js`（初始化数据）。
- `frontend-app/src`：组件（`TodoList`/`TodoDialog` 等）、状态原子（`atoms`）、API 客户端（`service/apiTodo.ts`）、hooks（`hooks/todo/*`）、样式（`assets`）。

## 环境要求
- Node.js 18+
- pnpm 10.x（`packageManager: pnpm@10.6.5`）
- PostgreSQL（`.env` 默认 `localhost`）

## 安装与启动
1) 安装依赖  
```bash
cd backend-app && pnpm install
cd ../frontend-app && pnpm install
```

2) 配置后端环境变量 `backend-app/.env`  
```
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```
确认数据库已创建并启动。

3) （可选）导入示例数据  
```bash
cd backend-app
pnpm seed   # 使用 src/scripts/data/initData.json，强制重建 todo 表
```

4) 启动后端  
```bash
cd backend-app
pnpm dev    # http://localhost:3000
```

5) 配置前端环境变量 `frontend-app/.env`  
```
VITE_BASE_URL=http://localhost:3000/v1/todos
VITE_PAGE_SIZE=5
```

6) 启动前端  
```bash
cd frontend-app
pnpm dev    # 默认 http://localhost:5173
```

## API（前缀 /v1）
- `GET /todos?page={n}&limit={n}&search={text}`：分页/搜索获取列表，响应 `{ message, data: Todo[] }`
- `GET /todos/{todoId}`：获取单条
- `POST /todos`：新增，Body: `{ id, title, tag, content }`
- `PATCH /todos`：更新，Body: `{ id, title?, tag?, content? }`
- `DELETE /todos/{todoId}`：删除
- `GET /todos/count?search={text}`：获取总数（分页用）
- 响应包含 `message`，有数据时含 `data`；未找到返回 404。`/v1` 路由限流 1 秒 10 次。
- 日志：Pino 输出到 `src/logs/all-logs.log` 以及 warn/error 专用文件。

## 前端行为
- 顶部 Menubar 搜索框变更 → React Query 重新请求，附带 `search` 参数。
- 列表用 PrimeReact DataView 展示；删除后通过 React Query 失效缓存刷新列表。
- `Add` 或行内编辑按钮打开 `TodoDialog`；表单提交调用 POST/PATCH，操作完成后 Toast 提示。
- 分页：`Paginator` 调用 `/todos/count`，行数取 `VITE_PAGE_SIZE`。
- 状态：Jotai 管理 UI/本地状态（加载态、当前编辑项等），React Query 管理服务端数据。

## 常用操作
- 修改模型：`backend-app/src/models/todoModel.js`（表名 `todo`，无时间戳），ID 可由客户端生成。
- 调整初始数据：编辑 `backend-app/src/scripts/data/initData.json` 后运行 `pnpm seed`。
- 架构示意：`backend-app/architecture.png`。

## 故障排查
- 数据库连接失败：检查 `.env`、PostgreSQL 是否启动，以及启动日志中是否出现 “Connection has been established successfully.”。
- 端口/CORS：如端口占用，修改 `PORT`；若跨域异常，确认 `cors` 已启用（`app.js`）。
- 查看日志：`backend-app/src/logs/*.log`。
