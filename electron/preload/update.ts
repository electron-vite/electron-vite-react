import { autoUpdater } from "electron-updater"
import { app, ipcMain } from "electron";
export const update = (win: Electron.CrossProcessExports.BrowserWindow) => {

  // When set to false, the update download will be triggered through the API
  autoUpdater.autoDownload = false;

  autoUpdater.disableWebInstaller = false

  autoUpdater.allowDowngrade = false;

  // Save the version status of whether the update needs to be installed,
  // Because the user needs to update immediately and later after the update is downloaded
  let NEED_INSTALL = false;

  // Check whether update is used
  ipcMain.on('check-update',()=>{
    autoUpdater.checkForUpdatesAndNotify()
      .then((res) => {
        win.webContents.send('check-update-type',{ checkUpdate: true})
      }).catch(err => {
        //  network error
        win.webContents.send('check-update-type', { checkUpdate: false})
      });
  })

  // start check
  autoUpdater.on('checking-for-update', function () {
    console.log('checking-for-update')
  })
  // update available
  autoUpdater.on('update-available', (arg) => {
    console.log('update-available')
    win.webContents.send('is-update-available', { isUpdate: true, oldVersion: app.getVersion(), newVersion: arg?.version })
  })
  // update not available
  autoUpdater.on('update-not-available', (arg) => {
    console.log('update-not-available')
    win.webContents.send('is-update-available', { isUpdate: false, oldVersion: app.getVersion(), newVersion: arg?.version })
  })

  const startDownload = (callback: any, successCallback: any) => {
    // Monitor the download progress and push it to the update window
    autoUpdater.on('download-progress', (data) => {
      console.log("progress", data)
      win.webContents.send('download-progress-data', data)
      callback && callback instanceof Function && callback(null, data);
    });
    // Listen for download errors and push to the update window
    autoUpdater.on('error', (err) => {
      callback && callback instanceof Function && callback(err);
    });
    // Listen to the download completion and push it to the update window
    autoUpdater.on('update-downloaded', () => {
      NEED_INSTALL = true;
      successCallback && successCallback instanceof Function && successCallback();
    });

    autoUpdater.downloadUpdate();
  };

  // Listen to the process message sent by the application layer and start downloading updates
  ipcMain.on('start-download', (event) => {
    console.log("start")
    startDownload(
      (err: any, progressInfo: { percent: any; }) => {
        if (err) {
          // callback download error message
          event.sender.send('update-error', { updateError:true});
        } else {
           // callback update progress message
          event.sender.send('update-progress', { progressInfo: progressInfo.percent });
        }
      },
      () => {
        // callback update downed message
        event.sender.send('update-downed');
      }
    );
  });

  // install now
  ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true);
  })

  // install later
  app.on('will-quit', () => {
    console.log("NEED_INSTALL=true")
    if (NEED_INSTALL) {
      autoUpdater.quitAndInstall(true, false);
    }
  });

}