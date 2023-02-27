import { autoUpdater } from "electron-updater"
import { app, ipcMain } from "electron";
export const update = (win: Electron.CrossProcessExports.BrowserWindow) => {
  // 设置日志打印

  // 是否自动下载更新，设置为 false 时将通过 API 触发更新下载
  autoUpdater.autoDownload = false;

  autoUpdater.disableWebInstaller = false

  // 是否允许版本降级，也就是服务器版本低于本地版本时，依旧以服务器版本为主
  autoUpdater.allowDowngrade = false;

  // 设置服务器版本最新版本查询接口配置
  autoUpdater.setFeedURL({
    provider: 'generic', 
    channel: 'latest',
    url: 'https://github.com/RSS1101/electron-vite-react/releases/download/v9.9.9/',
  });

  // 保存是否需要安装更新的版本状态，因为需要提供用户在下载完成更新之后立即更新和稍后更新的操作
  let NEED_INSTALL = false;

  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    }
  });

  // 调用 API 检查是否用更新
  ipcMain.on('check-update',()=>{
    autoUpdater.checkForUpdatesAndNotify()
      .then((res) => {
        win.webContents.send('check-update-type',{ checkUpdate: true})
      }).catch(err => {
        // 网络错误 network error
        win.webContents.send('check-update-type', { checkUpdate: false})
      });
  })

  // 检测开始
  autoUpdater.on('checking-for-update', function () {
    console.log('checking-for-update')
  })
  // 更新可用
  autoUpdater.on('update-available', (arg) => {
    console.log('update-available')
    win.webContents.send('is-update-available', { isUpdate: true, oldVersion: app.getVersion(), newVersion: arg?.version })
  })
  // 更新不可用
  autoUpdater.on('update-not-available', (arg) => {
    console.log('update-not-available')
    win.webContents.send('is-update-available', { isUpdate: false, oldVersion: app.getVersion(), newVersion: arg?.version })
  })
  // API 触发更新下载
  const startDownload = (callback: any, successCallback: any) => {
    // 监听下载进度并推送到更新窗口
    autoUpdater.on('download-progress', (data) => {
      console.log("progress", data)
      win.webContents.send('download-progress-data', data)
      callback && callback instanceof Function && callback(null, data);
    });
    // 监听下载错误并推送到更新窗口
    autoUpdater.on('error', (err) => {
      console.log("error")
      callback && callback instanceof Function && callback(err);
    });
    // 监听下载完成并推送到更新窗口
    autoUpdater.on('update-downloaded', () => {
      console.log("update-downloaded")
      NEED_INSTALL = true;
      successCallback && successCallback instanceof Function && successCallback();
    });
    // 下载更新
    autoUpdater.downloadUpdate();
  };

  // 监听应用层发送来的进程消息，开始下载更新
  ipcMain.on('start-download', (event) => {
    console.log("start")
    startDownload(
      (err: any, progressInfo: { percent: any; }) => {
        if (err) {
          //回推下载错误消息
          console.log("update-error")
          event.sender.send('update-error', { updateError:true});
        } else {
          //回推下载进度消息
          console.log("pdate-progress-percent")
          event.sender.send('update-progress', { progressInfo: progressInfo.percent });
        }
      },
      () => {
        //回推下载完成消息
        console.log("update-downed")
        event.sender.send('update-downed');
      }
    );
  });

  ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true);
  })

  // 用户点击稍后安装后程序退出时执行立即安装更新
  app.on('will-quit', () => {
    console.log("NEED_INSTALL=true")
    if (NEED_INSTALL) {
      autoUpdater.quitAndInstall(true, false);
    }
  });

}