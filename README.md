# 5S 4M1E GP12 管理系统

## 项目简介

5S 4M1E GP12 管理系统是一个基于 React + TypeScript + Vite 构建的现代化企业管理应用，用于管理企业生产过程中的 5S 管理、4M1E 变更管理、GP12 早期生产遏制以及快速响应跟踪等核心业务流程。

项目编号: 7554689717892645174

## 功能模块

### 1. 5S 管理
- 可视化展示 5S 检查数据
- 可编辑表格用于数据录入和修改
- 数据导出功能

### 2. 4M1E 变更管理
- 管理人员、机器、材料、方法和环境的变更
- 变更记录追踪和审批流程

### 3. GP12 早期生产遏制
- 监控新产品早期生产质量
- 异常情况记录和处理

### 4. 快速响应跟踪
- 实时跟踪生产异常和问题
- 响应时间统计和分析

### 5. 技能矩阵管理
- 员工技能水平管理
- 技能培训计划追踪

### 6. 升级管理
- 问题升级流程管理
- 升级记录和处理结果追踪

## 技术栈

### 前端框架
- React 18.3.1
- TypeScript 5.7.2
- Vite 6.2.0

### UI 组件
- Tailwind CSS
- Lucide React (图标库)
- Framer Motion (动画库)
- Recharts (图表库)
- Sonner (通知组件)

### 状态管理
- React Context API

### 路由
- React Router DOM 7.3.0

### 测试
- Vitest 4.0.8 (单元测试和组件测试)
- Testing Library (组件测试)
- Playwright (端到端测试)

### 工具库
- Zod (数据验证)
- clsx + tailwind-merge (CSS 类名管理)

## 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/en) (推荐使用 LTS 版本)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

1. **克隆项目**

```sh
git clone <repository-url>
cd 5S 4M1E GP12
```

2. **安装依赖**

```sh
pnpm install
```

3. **启动开发服务器**

```sh
pnpm run dev
```

4. **在浏览器访问**

```
http://localhost:3000
```

## 构建和部署

### 构建生产版本

```sh
pnpm run build
```

构建产物将输出到 `dist` 目录。

### 部署

可以将 `dist` 目录部署到任何静态文件服务器，如：
- Nginx
- Apache
- Vercel
- Netlify
- GitHub Pages

## 测试

### 运行单元测试和组件测试

```sh
pnpm test
```

### 运行测试并生成覆盖率报告

```sh
pnpm test:coverage
```

覆盖率报告将生成在 `coverage` 目录中。

### 运行端到端测试

```sh
npx playwright test
```

## 项目结构

```
├── src/
│   ├── components/          # 可复用组件
│   │   ├── EditableTable.tsx   # 可编辑表格组件
│   │   ├── Empty.tsx           # 空状态组件
│   │   └── Layout.tsx          # 布局组件
│   ├── contexts/            # React Context
│   │   └── authContext.ts      # 认证上下文
│   ├── hooks/               # 自定义 Hooks
│   │   └── useTheme.ts         # 主题切换 Hook
│   ├── lib/                 # 工具库
│   │   └── utils.ts            # 通用工具函数
│   ├── pages/               # 页面组件
│   │   ├── EscalationManagement.tsx        # 升级管理
│   │   ├── FiveSManagement.tsx             # 5S 管理
│   │   ├── FourM1EChangeManagement.tsx     # 4M1E 变更管理
│   │   ├── GP12EarlyProduction.tsx         # GP12 早期生产遏制
│   │   ├── Home.tsx                        # 首页
│   │   ├── QuickResponseTracking.tsx       # 快速响应跟踪
│   │   └── SkillMatrix.tsx                 # 技能矩阵
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.tsx              # 应用根组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── tests/                   # 测试文件
│   ├── components/          # 组件测试
│   ├── e2e/                 # 端到端测试
│   ├── features/            # 功能测试
│   └── setup.ts             # 测试设置
├── .gitignore               # Git 忽略配置
├── README.md                # 项目说明文档
├── TEST_STRATEGY.md         # 测试策略文档
├── package.json             # 项目依赖和脚本
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 代码规范

### 命名约定
- 组件名使用 PascalCase
- 文件名与组件名保持一致
- 变量和函数名使用 camelCase
- 类型和接口名使用 PascalCase

### 代码风格
- 使用 TypeScript 严格模式
- 组件使用函数式组件和 Hooks
- 优先使用 React Context API 进行状态管理
- 遵循 Tailwind CSS 最佳实践

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有任何问题或建议，请通过以下方式联系：

- 项目地址：[https://space.coze.cn/task/7554689717892645174](https://space.coze.cn/task/7554689717892645174)
- 开发团队：网站开发专家

## 更新日志

### v0.0.1 (初始版本)
- 实现了 5S 管理模块
- 实现了 4M1E 变更管理模块
- 实现了 GP12 早期生产遏制模块
- 实现了快速响应跟踪模块
- 实现了技能矩阵管理模块
- 实现了升级管理模块
- 实现了主题切换功能
- 实现了数据导出功能
- 完善了测试用例

## 致谢

感谢所有为项目做出贡献的开发人员和测试人员！
