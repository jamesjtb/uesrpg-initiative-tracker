const { app } = require('electron');

const { writeFile, readFile} = require('fs').promises;

const registerAppHandlers = (ipcMain) => {
  ipcMain.handle('app:quit', () => app.quit());

  ipcMain.handle('app:version', () => app.getVersion());
  
  ipcMain.handle('app:usersettings:save', async (e, { userSettings }) => {
    const writeResult = await writeFile(`${app.getPath('userData')}/usersettings.json`, JSON.stringify(userSettings), 'utf8');
    return writeResult;
  });
  
  ipcMain.handle('app:usersettings:load', async (e) => {
    try {
      const fileContents = await readFile(`${app.getPath('userData')}/usersettings.json`, 'utf8');
      return JSON.parse(fileContents);
    } catch (e) {
      console.log(`Error loading user settings: ${e.message}`);
      return null;
    }
  });
}

module.exports = registerAppHandlers;
