# vite-react-electron

![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

**English | [简体中文](README.zh-CN.md)**
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

```tree
├
├── configs
├   ├── vite.main.ts                 Main-process config file, for -> src/main
├   ├── vite.preload.ts              Preload-script config file, for -> src/preload
├   ├── vite.renderer.ts             Renderer-script config file, for -> src/renderer
├
├── scripts
├   ├── build.mjs                    Build script, for -> npm run build
├   ├── electron-builder.config.mjs
├   ├── watch.mjs                    Develop script, for -> npm run dev
├
├── src
├   ├── main                         Main-process source code
├   ├── preload                      Preload-script source code
├   ├── renderer                     Renderer-process source code
├
```

#### `dist` and `src`

- Once `npm run dev` or `npm run build` is executed. Will be generated `dist`, it is the same as the `src` structure.

- This ensures the accuracy of path calculation.

```tree
├── dist
|   ├── main
|   ├── preload
|   ├── renderer
├── src
|   ├── main
|   ├── preload
|   ├── renderer
|
```

## How to work

- The `Main-process`, `Renderer-process` and `Preload-script` are all config in `configs/xxx.ts`.

- All files are built using `Vite`, is supper fast.

- `scripts/build.mjs` only calls the `Vite` API and uses the `configs/xxx.ts` config file to build.

- The difference between `scripts/watch.mjs` and `build.mjs` is that the watch option is configured for the Main-process and Preload-script. The Renderer-process uses `require ('vite').createServer`

- Manage projects more through configuration other than scripts. -- **🥳 Simple and clear**

## Demo

<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/vite-react-electron/react-win.png" />

## Wechat group | | 请我喝杯下午茶 🥳

<div style="display:flex;">
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/%24qrcode/%2419.99.png" />
</div>
