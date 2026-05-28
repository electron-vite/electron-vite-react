# electron-updater

[English](README.md) | 简体中文

使用 `electron-updater` 检测、下载并安装 Electron 应用更新。

```sh
pnpm add electron-updater
```

## 主要流程

### 1. 配置更新服务

在 `electron-builder.json` 中添加 `publish` 字段，用来配置更新地址和 provider。

```json5
{
  publish: {
    provider: 'generic',
    channel: 'latest',
    url: 'https://foo.com/',
  },
}
```

更多详情请见：[electron-builder.json](https://github.com/electron-vite/electron-vite-react/blob/main/electron-builder.json)

### 2. 主进程更新逻辑

本项目保持 `autoDownload` 关闭，因此下载需要由用户手动触发。

- `check-update` 会在打包后调用 `autoUpdater.checkForUpdates()`。
- 主进程在收到 `update-available` 或 `update-not-available` 时，会向渲染进程发送 `update-can-available`。
- `start-download` 会开始下载更新，并把下载进度转发到渲染进程。
- `cancel-download` 会取消当前下载，并重置取消令牌。
- `quit-and-install` 会安装已下载的更新并重启应用。

更多详情请见：[update.ts](https://github.com/electron-vite/electron-vite-react/blob/main/electron/main/update.ts)

### 3. 渲染进程 UI

更新页面是用户触发上述流程的入口，用户通过页面按钮触发 Electron 的更新动作。

- 点击 **Check update** 触发 `check-update`。
- 如果发现新版本，页面会允许用户开始或取消下载。
- 下载完成后，页面会切换为 **Install now**。

更多详情请见：[components/update/index.tsx](https://github.com/electron-vite/electron-vite-react/blob/main/src/components/update/index.tsx)

---

建议通过用户操作触发更新。在本项目中，流程从用户点击 **Check update** 开始。

更多使用 `electron-updater` 的信息请参考 [官方文档](https://www.electron.build)
