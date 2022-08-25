const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fs', {
    saveCombatants: (combatantType, combatantsObject) => {
        return ipcRenderer.invoke('message', {
            type: 'saveCombatants',
            payload: { type: combatantType, combatants: combatantsObject },
        });
    },
    loadFile: () => ipcRenderer.invoke('message', { type: 'loadFile' }),
    saveSettings: userSettings =>
        ipcRenderer.invoke('message', { type: 'app:usersettings:save', payload: userSettings }),
    loadSettings: () => ipcRenderer.invoke('message', { type: 'app:usersettings:load' }),
});

contextBridge.exposeInMainWorld('app', {
  quit: () => ipcRenderer.invoke('message', { type: 'app:quit' }),
});
