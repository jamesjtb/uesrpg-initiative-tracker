// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

const IPCMessageHandler = require('./ipc-router/message-handler');

let mainWindow;
let ipcMessageHandler;

function createWindow() {
  const mainWindowState = windowStateKeeper({ defaultWidth: 1280, defaultHeight: 720 });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    title: `UESRPG Companion v${app.getVersion()}`,
  });

  ipcMessageHandler = new IPCMessageHandler(mainWindow);

  // Remove the appMenu
  if (!isDev) mainWindow.setMenu(null);

  // Set the Start URL
  const startURL = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindowState.manage(mainWindow);

  // Open new window links in browser
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(startURL);

  // Open the DevTools.
  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');
    await installExtension(REACT_DEVELOPER_TOOLS);
  }

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('message', async (e, action) => {
    return await ipcMessageHandler.handle(action);
});
