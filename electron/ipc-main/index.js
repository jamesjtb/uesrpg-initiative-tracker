const { ipcMain } = require('electron');

const registerAppHandlers = require('./app');
const registerFilestoreHandlers = require('./filestore');

const register = (mainWindow) => {
  registerAppHandlers(ipcMain);
  registerFilestoreHandlers(ipcMain, mainWindow);
};

module.exports = { register };