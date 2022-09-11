const { contextBridge, ipcRenderer, shell } = require('electron');
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
    getVersion: () => ipcRenderer.invoke('message', { type: ipcActions.APP.GETVERSION }),
});

contextBridge.exposeInMainWorld('settings', {
    get: settingArea =>
        ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET, payload: settingArea }),
    update: settingUpdate =>
        ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.UPDATE, payload: settingUpdate }),
    getTypes: () => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET_TYPES }),
    getAreas: () => ipcRenderer.invoke('message', { type: ipcActions.SETTINGS.GET_AREAS }),
    onUpdate: handler =>
        ipcRenderer.on(ipcActions.SETTINGS.ON_UPDATE, (event, ...args) => handler(...args)),
});

contextBridge.exposeInMainWorld('playerCharacters', {
    write: playerCharacter =>
        ipcRenderer.invoke('message', { type: ipcActions.PCS.WRITE, payload: playerCharacter }),
    getAll: () => ipcRenderer.invoke('message', { type: ipcActions.PCS.GETALL }),
});

contextBridge.exposeInMainWorld('system', {
    openInBrowser: url => shell.openExternal(url),
});
