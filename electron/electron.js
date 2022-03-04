// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const { writeFile, readFile } = require('fs').promises;
const url = require('url');
const path = require('path');

const isDev = require('electron-is-dev');

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  // Remove the appMenu
  if (!isDev) mainWindow.setMenu(null);
  
  // Set the Start URL
  const startURL = isDev ? "http://localhost:3000" : url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
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
    const { default: installExtension, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer');
    await installExtension(REACT_DEVELOPER_TOOLS);
  }

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/***********IPC Main***********/

ipcMain.handle('app:quit', () => app.quit());

/*************** Initiative Tracker Filesystem **************/
ipcMain.handle('saveCombatants', async (e, data) => {
  const fileFiltersMap = {
    'PC': [{ name: 'UESRPG 3e Party File', extensions: ['3eup'] }],
    'NPC': [{ name: 'UESRPG 3e Encounter File', extensions: ['3eue']}]
  }
  const saveOptions = await dialog.showSaveDialog(mainWindow, {
    title: `Select path to save ${data.type} to file...`,
    filters: fileFiltersMap[data.type]
  });

  if (!saveOptions.canceled) {
    const writeResult = await writeFile(saveOptions.filePath.toString(), JSON.stringify(data.combatants), 'utf8');
    return writeResult;
  }
});

ipcMain.handle('loadFile', async (e) => {
  const loadOptions = await dialog.showOpenDialog(mainWindow, {
    title: `Load from file...`,
    filters: [
      { name: 'UESRPG 3e Combatant Files', extensions: ['3eup', '3eue'] },
      { name: 'UESRPG 3e Encounter File', extensions: ['3eue'] },
      { name: 'UESRPG 3e Party File', extensions: ['3eup'] }
    ]
  });
  if (!loadOptions.canceled) {
    const extensionMap = {
      '.3eup': '3e-party',
      '.3eue': '3e-encounter'
    };
    const dataType = extensionMap[path.extname(loadOptions.filePaths[0])];
    if (!dataType) return {type: 'error', errorReason: 'invalid-extension'};
    const fileContents = await readFile(loadOptions.filePaths[0], 'utf8');
    const loadedData = JSON.parse(fileContents);
    return {type: dataType, data: loadedData};
  }
})