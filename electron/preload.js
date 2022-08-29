const { contextBridge, ipcRenderer } = require('electron');
const ipcActions = require('../src/shared/ipc-actions');

contextBridge.exposeInMainWorld('fs', {
    saveCombatants: (combatantType, combatantsObject) => {
        return ipcRenderer.invoke('message', {
            type: ipcActions.FILESTORE.SAVE_COMBATANTS,
            payload: { type: combatantType, combatants: combatantsObject },
        });
    },
    loadFile: () => ipcRenderer.invoke('message', { type: ipcActions.FILESTORE.LOAD_FILE }),
});

contextBridge.exposeInMainWorld('app', {
  quit: () => ipcRenderer.invoke('message', { type: ipcActions.APP.QUIT }),
});

contextBridge.exposeInMainWorld('settings', {
    get: (settingArea) => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET, payload: settingArea }),
    update: (settingUpdate) => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.UPDATE, payload: settingUpdate }),
    getTypes: () => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET_TYPES }),
    getAreas: () => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET_AREAS })
});
