const { dialog } = require('electron');

const registerFilestoreHandlers = (ipcMain, mainWindow) => {
  /* Initiative Tracker Filesystem */
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
  });
}

module.exports = registerFilestoreHandlers;
