# vite-react-electron

![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

**English | [简体中文](README.zh-CN.md)**

## Overview

- All config files `Main-process`, `Renderer-process` and `Preload-script` they are in `configs/*.ts`.

- All files are built using `Vite`, is supper fast.

- `scripts/build.mjs` just calls the `Vite` API and uses the `configs/*.ts` config file to build.

- The difference between `scripts/watch.mjs` and `build.mjs` is that the watch option is configured for the Main-process and Preload-script. The Renderer-process uses `require ('vite').createServer`

- Manage projects more through configuration other than scripts. -- **🥳 Simple and clearly**

## Run Setup

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

## Directory

Once `dev` or `build` npm-script executed will be generate named `dist` folder. It has children dir of same as `src` folder, the purpose of this design can ensure the correct path calculation.

```tree
├
├── configs
├   ├── vite-main.config.ts          Main-process config file, for -> src/main
├   ├── vite-preload.config.ts       Preload-script config file, for -> src/preload
├   ├── vite-renderer.config.ts      Renderer-script config file, for -> src/renderer
├
├── dist                             After build, it's generated according to the "src" directory
├   ├── main
├   ├── preload
├   ├── renderer
├
├── scripts
├   ├── build.mjs                    Build script, for -> npm run build
├   ├── watch.mjs                    Develop script, for -> npm run dev
├
├── src
├   ├── main                         Main-process source code
├   ├── preload                      Preload-script source code
├   ├── renderer                     Renderer-process source code
├
```

## Use Electron, NodeJs API

> 🚧 By default, Electron don't support the use of API related to Electron and NoeJs in the Renderer-process, but someone still need to use it. If so, you can see the 👉 npm-package **[vitejs-plugin-electron](https://www.npmjs.com/package/vitejs-plugin-electron)** or another template **[electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)**

#### All Electron, NodeJs API invoke passed `Preload-script`

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

## Shown

<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/vite-react-electron/react-win.png" />

## Wechat group

<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />
