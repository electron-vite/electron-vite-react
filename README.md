# electron-vite-react

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

English | [简体中文](README.zh-CN.md)

## Overview

📦 Out of the box  
🎯 Based on the official [react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) template, less invasive  
🌱 Extensible, really simple directory structure  
💪 Support using Node.js API in Electron-Renderer  
🔩 Support C/C++ native addons  
🖥 It's easy to implement multiple windows  

## Quick start

```sh
npm create electron-vite
```

![electron-vite-react.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react.gif?raw=true)

## Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react-debug.gif?raw=true)

## Directory structure

*🚨 By default, the files in `electron` folder will be built into the `dist/electron`*

```tree
├── electron                  Electron-related code
│   ├── main                  Main-process source code
│   ├── preload               Preload-scripts source code
│   └── resources             Resources for the production build
│       ├── icon.icns             Icon for the application on macOS
│       ├── icon.ico              Icon for the application
│       ├── installerIcon.ico     Icon for the application installer
│       └── uninstallerIcon.ico   Icon for the application uninstaller
│
├── release                   Generated after production build, contains executables
│   └── {version}
│       ├── {os}-unpacked     Contains unpacked application executable
│       └── Setup.{ext}       Installer for the application
│
├── public                    Static assets
└── src                       Renderer source code, your React application
```

## 🚨 Be aware

By default, this template integrates Node.js in the Renderer process. If you don't need it, you just remove the option below. [Because it will modify the default config of Vite](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

electron({
- renderer: {}
})
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in Electron-Renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)
