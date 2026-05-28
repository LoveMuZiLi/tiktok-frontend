# 前端工程结构

```
src/
├── app/                 # 应用入口（App、Provider）
├── router/              # 路由表与路径常量
├── layouts/             # 布局壳（主框架、底栏）
├── pages/               # 页面（按业务域分目录）
│   ├── home/
│   ├── friends/
│   ├── inbox/
│   ├── profile/
│   ├── upload/
│   └── user/
├── components/          # 可复用 UI
│   ├── layout/          # 布局组件
│   ├── business/        # 业务组件
│   └── common/          # 通用组件
├── shared/              # 跨模块共享
│   ├── api/             # HTTP 客户端与接口
│   ├── types/           # 类型定义
│   └── ui/              # 设计系统 / shadcn
├── assets/              # 静态资源
└── styles/              # 全局样式
```

约定：`pages` 只放路由级页面；`components` 放可复用块；接口调用走 `shared/api`。
