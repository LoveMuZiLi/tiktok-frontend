# TikTok 前端

React + Vite + Tailwind 短视频 UI。

## 工程结构

见 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。

```
src/
├── app/           # 入口
├── router/        # 路由
├── layouts/       # 布局
├── pages/         # 页面（按模块分目录）
├── components/    # 组件（layout / business / common）
├── shared/        # api、types、ui
├── assets/
└── styles/
```

## 开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
export VITE_API_BASE_URL=
npm run build
```

后端仓库：[tiktok-backend](https://github.com/LoveMuZiLi/tiktok-backend)
