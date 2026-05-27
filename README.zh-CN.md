# electron-vite-react

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub stars](https://img.shields.io/github/stars/electron-vite/electron-vite-react?color=fa6470)
![GitHub issues](https://img.shields.io/github/issues/electron-vite/electron-vite-react?color=d8b22d)
![GitHub license](https://img.shields.io/github/license/electron-vite/electron-vite-react)
[![Required Node.js >= 20.19.0 || >= 22.12.0](https://img.shields.io/static/v1?label=node&message=%3E=20.19.0%20||%20%3E=22.12.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

[English](README.md) | 简体中文

## 概览

- 开箱即用。
- 基于官方的 [template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)。
- 支持在渲染进程中使用 Electron 和 Node.js API。
- 支持 C/C++ 原生模块。
- 包含调试配置。
- 易于扩展为多窗口应用。

## 快速开始

```sh
# 克隆项目
git clone https://github.com/electron-vite/electron-vite-react.git

# 进入项目目录
cd electron-vite-react

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

## 可用脚本

- `pnpm dev`：启动 Vite 开发服务器。
- `pnpm build`：构建渲染进程并使用 electron-builder 打包应用。
- `pnpm preview`：本地预览生产构建结果。
- `pnpm test`：运行 Vitest 单元测试。
- `pnpm test:e2e`：构建测试模式产物并运行 Playwright 测试。
- `pnpm typecheck`：运行 TypeScript 类型检查。

## 项目结构

```tree
├── build/            打包资源
├── dist-electron/    编译后的 Electron 输出
├── electron/         主进程和 preload 源码
│   ├── main/
│   └── preload/
├── public/           静态资源
├── src/              渲染进程源码
│   ├── components/
│   │   └── update/
│   ├── demos/
│   └── type/
└── test/             单元测试和端到端测试
    └── e2e/
```

`electron/` 下的文件会被编译到 `dist-electron/`。

## 安全说明

`vite.config.ts` 里的 `renderer: {}` 只是给 Vite 用的适配器，用来在渲染进程中修复 Electron、Node.js API 和原生模块的使用，它本身并不等同于开启 Node integration。若确实需要在渲染进程中直接使用 Node.js，请在主进程创建 `BrowserWindow` 时开启 `nodeIntegration`，并谨慎评估安全影响。

## 功能

1. Electron 自动更新，文档见 [src/components/update/README.md](src/components/update/README.md)。
2. Vitest 单元测试和 Playwright 端到端测试。
3. TailwindCSS v4。

## 资源

- 自动更新文档：[English](src/components/update/README.md) | [简体中文](src/components/update/README.zh-CN.md)
- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
