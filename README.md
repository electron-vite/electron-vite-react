# electron-vite-react

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub stars](https://img.shields.io/github/stars/electron-vite/electron-vite-react?color=fa6470)
![GitHub issues](https://img.shields.io/github/issues/electron-vite/electron-vite-react?color=d8b22d)
![GitHub license](https://img.shields.io/github/license/electron-vite/electron-vite-react)
[![Required Node.js >= 20.19.0 || >= 22.12.0](https://img.shields.io/static/v1?label=node&message=%3E=20.19.0%20||%20%3E=22.12.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

English | [简体中文](README.zh-CN.md)

## Overview

- Ready out of the box.
- Based on the official [template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).
- Supports Electron and Node.js APIs in the renderer process.
- Supports C/C++ native addons.
- Includes debugger configuration.
- Easy to extend to multiple windows.

## Quick Start

```sh
# clone the project
git clone https://github.com/electron-vite/electron-vite-react.git

# enter the project directory
cd electron-vite-react

# install dependencies
pnpm install

# start development
pnpm dev
```

## Available Scripts

- `pnpm dev`: start the Vite dev server.
- `pnpm build`: build the renderer and package the app with electron-builder.
- `pnpm preview`: preview the production web build locally.
- `pnpm test`: run Vitest unit tests.
- `pnpm test:e2e`: build the test mode bundle and run Playwright tests.
- `pnpm typecheck`: run the TypeScript type checker.

## Project Structure

```tree
├── build/            Packaging assets
├── dist-electron/    Compiled Electron output
├── electron/         Main-process and preload source
│   ├── main/
│   └── preload/
├── public/           Static assets
├── src/              Renderer source code
│   ├── components/
│   │   └── update/
│   ├── demos/
│   └── type/
└── test/             Unit and end-to-end tests
    └── e2e/
```

Files under `electron/` are compiled into `dist-electron/`.

## Security Note

The `renderer: {}` preset in `vite.config.ts` is only a Vite adapter that polyfills Electron, Node.js APIs and native modules for the renderer process. It is not the same as enabling Node integration. If you want direct Node.js access in the renderer, enable `nodeIntegration` in the `BrowserWindow` webPreferences in the main process and review the security impact carefully.

## Features

1. Electron auto update with docs in [src/components/update/README.md](src/components/update/README.md).
2. Vitest unit tests and Playwright end-to-end tests.
3. TailwindCSS v4.

## Resources

- Auto-update docs: [English](src/components/update/README.md) | [简体中文](src/components/update/README.zh-CN.md)
- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
