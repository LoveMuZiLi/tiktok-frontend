# TikTok 前端

TikTok / 抖音风格短视频 UI（React + Vite + Tailwind），源自 Figma [TikTok项目构建](https://www.figma.com/design/Mnkon4GktmuY7wtSSjTYkJ/TikTok%E9%A1%B9%E7%9B%AE%E6%9E%84%E5%BB%BA)。

后端仓库：[tiktok-backend](https://github.com/LoveMuZiLi/tiktok-backend)

## 开发

```bash
npm install
npm run dev
```

开发环境 `/api` 代理到 `http://localhost:8080`（需本地启动后端）。

## 环境变量

```bash
cp .env.example .env
```

生产构建 **`VITE_API_BASE_URL` 留空**（见 `.env.production.example`）：页面与 API 同域，由 Nginx `:8088` 将 `/api` 转发到服务器上的 Go 后端。

## CI

推送至 `main` 时 GitHub Actions 自动执行 `npm install` 与 `npm run build`。
