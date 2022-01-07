# vite-react-electron

![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

**[English](README.md) | 简体中文**

## 概述

- 主进程(main-process)、渲染进程(renderer-process)、预加载脚本(preload-script) 全部在 `configs/xxx.ts` 中配置 -- 全量级的 `Vite` 编译还是相当快的

- `scripts/build.mjs` 只是调用了 `Vite` 的 API 并使用 `configs/xxx.ts` 配置文件进行构建

- `scripts/watch.mjs` 与 `build.mjs` 区别是 主进程(main-process)、预加载脚本(preload-script) 配置了 `watch` 选项；渲染进程则是使用了 `require('vite').createServer`

- 项目整体趋于 配置化 而不是大量的脚本让人眼花缭乱 -- **上手简单**

## 运行

  ```bash
  # clone the project
  git clone git@github.com:caoxiemeihao/vite-react-electron.git

  # enter the project directory
  cd vite-react-electron

  # install dependency
  npm install

  # develop
  npm run dev
  ```

## 目录

一旦启动或打包脚本执行过，会在根目录产生 **`dist` 文件夹，里面的文件夹同 `src` 一模一样**；在使用一些路径计算时，尤其是相对路径计算；`dist` 与 `src` 里面保持相同的目录结构能避开好多问题

```tree
├
├── configs
├   ├── vite-main.config.ts          主进程配置文件，编译 src/main
├   ├── vite-preload.config.ts       预加载脚本配置文件，编译 src/preload
├   ├── vite-renderer.config.ts      渲染进程配置文件，编译 src/renderer
├
├── dist                             构建后，根据 src 目录生成
├   ├── main
├   ├── preload
├   ├── renderer
├
├── scripts
├   ├── build.mjs                    项目构建脚本，对应 npm run build
├   ├── watch.mjs                    项目开发脚本，对应 npm run dev
├
├── src
├   ├── main                         主进程源码
├   ├── preload                      预加载脚本源码
├   ├── renderer                     渲染进程源码
├
```

## 渲染进程使用 NodeJs API

> 🚧 因为安全的原因 Electron 默认不支持在 渲染进程 中使用 NodeJs API，但是有些小沙雕就是想这么干，拦都拦不住；实在想那么干的话，这里有个 👉 npm 包 **[vitejs-plugin-electron](https://www.npmjs.com/package/vitejs-plugin-electron)** 或者使用另一个模板 **[electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)**

#### 推荐所有的 NodeJs、Electron API 通过 `Preload-script` 注入到 渲染进程中

* **src/preload/index.ts**

  ```typescript
  import fs from 'fs'
  import { contextBridge, ipcRenderer } from 'electron'

  // Expose Electron, NodeJs API to Renderer-process
  contextBridge.exposeInMainWorld('bridge', {
    fs,
    ipcRenderer: withPrototype(ipcRenderer),
  })
  ```

* **src/renderer/src/global.d.ts**

  ```typescript
  // Defined on the window
  interface Window {
    bridge: {
      fs: typeof import('fs')
      ipcRenderer: import('electron').IpcRenderer
    }
  }
  ```

* **src/renderer/src/main.tsx**

  ```typescript
  // Use Electron, NodeJs API in Renderer-process
  console.log('fs', window.bridge.fs)
  console.log('ipcRenderer', window.bridge.ipcRenderer)
  ```

## 效果

<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/vite-react-electron/react-win.png" />

## 微信讨论群 | | 请我喝杯下午茶 🥳

<div style="display:flex;">
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/%24qrcode/%24.png" />
</div>
