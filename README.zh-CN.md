# vite-electron-boilerplate

![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-electron-boilerplate?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-electron-boilerplate?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-electron-boilerplate?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

**[English](README.md) | 简体中文**

## 运行

  ```bash
  # clone the project
  git clone git@github.com:caoxiemeihao/vite-electron-boilerplate.git

  # enter the project directory
  cd vite-electron-boilerplate

  # install dependency(Recommend use yarn)
  yarn

  # develop
  yarn dev
  ```

## 分支

- `main` - **[Electron + Vite + React](https://github.com/caoxiemeihao/vite-electron-boilerplate/tree/main)**

- `vue-ts` - **[Electron + Vite + Vue3](https://github.com/caoxiemeihao/vite-electron-boilerplate/tree/vue-ts)**

## 目录

```tree
├
├── configs
├   ├── vite.main.ts                 主进程配置文件，编译 src/main
├   ├── vite.preload.ts              预加载脚本配置文件，编译 src/preload
├   ├── vite.react-ts.ts             渲染进程配置文件，编译 src/react-ts
├
├── scripts
├   ├── build.mjs                    项目构建脚本，对应 npm run build
├   ├── electron-builder.config.mjs
├   ├── watch.mjs                    项目开发脚本，对应 npm run dev
├
├── src
├   ├── main                         主进程源码
├   ├── preload                      预加载脚本源码
├   ├── react-ts                     渲染进程源码
├
```

## 原理

- 主进程(main-process)、渲染进程(renderer-process)、预加载脚本(preload-script) 全部在 `configs/xxx.ts` 中配置 -- 全量级的 `Vite` 编译还是相当快的

- `scripts/build.mjs` 只是调用了 `Vite` 的 API 并使用 `configs/xxx.ts` 配置文件进行构建

- `scripts/watch.mjs` 与 `build.mjs` 区别是 主进程(main-process)、预加载脚本(preload-script) 配置了 `watch` 选项；渲染进程则是使用了 `require('vite').createServer`

- 项目整体趋于 配置化 而不是大量的脚本让人眼花缭乱 -- **上手简单**


## 效果

<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/vite-electron-boilerplate/react-win.png" />

## 微信讨论群 | | 请我喝杯下午茶 🥳

<div style="display:flex;">
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/%24qrcode/%2419.99.png" />
</div>
