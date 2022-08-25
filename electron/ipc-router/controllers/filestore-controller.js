const { dialog } = require('electron');
const path = require('path');
const { writeFile, readFile } = require('fs/promises');

module.exports = {
    saveCombatants: async (data, mainWindow) => {
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
    },
    loadFile: async (mainWindow) => {
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
    }
};
