# electron-updater

English | [简体中文](README.zh-CN.md)

> Use `electron-updater` to detect, download, and install Electron app updates.

```sh
pnpm add electron-updater
```

## Main Flow

### 1. Configure the update server

Add a `publish` field to `electron-builder.json` to define the update source and provider.

```json5
{
  publish: {
    provider: 'generic',
    channel: 'latest',
    url: 'https://foo.com/',
  },
}
```

For more information, please refer to [electron-builder.json](https://github.com/electron-vite/electron-vite-react/blob/main/electron-builder.json)

### 2. Main-process update logic

This project keeps `autoDownload` disabled, so users start downloads manually.

- `check-update` calls `autoUpdater.checkForUpdates()` after packaging.
- The main process emits `update-can-available` when it receives `update-available` or `update-not-available`.
- `start-download` begins downloading the update and forwards download progress to the renderer.
- `cancel-download` stops the current download and resets the cancellation token.
- `quit-and-install` installs the downloaded update and restarts the app.

For more information, please refer to [update.ts](https://github.com/electron-vite/electron-vite-react/blob/main/electron/main/update.ts)

### 3. Renderer UI

The update page is the user-facing entry point for the flow above. Users click the page button to trigger update actions in Electron.

- Click **Check update** to trigger `check-update`.
- If an update is available, the page lets the user start or cancel the download.
- After the download completes, the page switches to **Install now**.

For more information, please refer to [components/update/index.tsx](https://github.com/electron-vite/electron-vite-react/blob/main/src/components/update/index.tsx)

---

Updates should be triggered by user action. In this project, the flow starts after the user clicks **Check update**.

For more information on using `electron-updater` for Electron updates, please refer to the [documentation](https://www.electron.build)
