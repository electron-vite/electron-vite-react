# vite-react-electron

![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

**English | [简体中文](README.zh-CN.md)**

## Overview

- Very simple Vite, React, Electron integration template.

- Contains only the basic dependencies.

- The extend is very flexible.

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
├── dist                      After build, it's generated according to the "src" directory
├   ├── main
├   ├── preload
├   ├── renderer
├
├── scripts
├   ├── build.mjs             Build script, for -> npm run build
├   ├── vite.config.mjs       Marin-process, Preload-script vite-config
├   ├── watch.mjs             Develop script, for -> npm run dev
├
├── src
├   ├── main                  Main-process source code
├   ├── preload               Preload-script source code
├   ├── renderer              Renderer-process source code
├       ├── vite.config.ts    Renderer-process vite-config
├
```

## Use Electron, NodeJs API

> 🚧 By default, Electron don't support the use of API related to Electron and NodeJs in the Renderer-process, but someone still need to use it. If so, you can see the template 👉 **[electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)**

#### All Electron, NodeJs API invoke passed `Preload-script`

* **src/preload/index.ts**

  ```typescript
  import fs from 'fs'
  import { contextBridge, ipcRenderer } from 'electron'

  // --------- Expose some API to Renderer-process. ---------
  contextBridge.exposeInMainWorld('fs', fs)
  contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
  ```

* **src/renderer/src/global.d.ts**

  ```typescript
  // Defined on the window
  interface Window {
    fs: typeof import('fs')
    ipcRenderer: import('electron').IpcRenderer
  }
  ```

* **src/renderer/src/main.ts**

  ```typescript
  // Use Electron, NodeJs API in Renderer-process
  console.log('fs', window.fs)
  console.log('ipcRenderer', window.ipcRenderer)
  ```

## Use SerialPort, SQLite3 or other node-native addons in Main-process

- First, yout need to make sure the deps in "dependencies". Because the project still needs it after packaged.

- Main-process, Preload-script are also built with Vite, and they are just built as [build.lib](https://vitejs.dev/config/#build-lib).  
So they just need to configure Rollup.

**Click to view more** 👉 [scripts/vite.config.mjs](https://github.com/caoxiemeihao/electron-vue-vite/blob/main/scripts/vite.config.mjs)

```js
export default {
  build: {
    // built lib for Main-process, Preload-script
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      // configuration here
      external: [
        'serialport',
        'sqlite3',
      ],
    },
  },
}
```

## `dependencies` vs `devDependencies`

- First, you need to know if deps(npm package) are still needed after packaged.

- Like [serialport](https://www.npmjs.com/package/serialport), [sqlite3](https://www.npmjs.com/package/sqlite3) they are node-native module and should be placed in `dependencies`. In addition, Vite will not build them, but treat them as external modules.

- Like [vue](https://www.npmjs.com/package/vue), [react](https://www.npmjs.com/package/react) they are pure javascript module and can be built with Vite, so they can be placed in `devDependencies`. This reduces the volume of the built project.

## Shown

<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/vite-react-electron/react-win.png" />

## Wechat group

<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />
