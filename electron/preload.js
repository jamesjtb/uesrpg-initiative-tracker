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
    get: (filter, sort) =>
        ipcRenderer.invoke('message', { type: ipcActions.PCS.GET, payload: { filter, sort } }),
    getOne: _id => ipcRenderer.invoke('message', { type: ipcActions.PCS.GETONE, payload: _id }),
    delete: _id => ipcRenderer.invoke('message', { type: ipcActions.PCS.DELETE, payload: _id }),
    onUpdate: handler =>
        ipcRenderer.on(ipcActions.PCS.ON_UPDATE, (event, ...args) => handler(...args)),
});

contextBridge.exposeInMainWorld('bestiary', {
    write: npc => ipcRenderer.invoke('message', { type: ipcActions.BESTIARY.WRITE, payload: npc }),
    get: (filter, sort) =>
        ipcRenderer.invoke('message', { type: ipcActions.BESTIARY.GET, payload: { filter, sort } }),
    getOne: _id =>
        ipcRenderer.invoke('message', { type: ipcActions.BESTIARY.GETONE, payload: _id }),
    delete: _id =>
        ipcRenderer.invoke('message', { type: ipcActions.BESTIARY.DELETE, payload: _id }),
    onUpdate: handler =>
        ipcRenderer.on(ipcActions.BESTIARY.ON_UPDATE, (event, ...args) => handler(...args)),
});

contextBridge.exposeInMainWorld('activeEncounter', {
    write: activeEncounter =>
        ipcRenderer.invoke('message', {
            type: ipcActions.ACTIVE_ENCOUNTER.WRITE,
            payload: activeEncounter,
        }),
    get: () => ipcRenderer.invoke('message', {type: ipcActions.ACTIVE_ENCOUNTER.GET}),
});

contextBridge.exposeInMainWorld('encounterList', {
    write: encounterList =>
        ipcRenderer.invoke('message', {
            type: ipcActions.ENCOUNTER_STORE.WRITE,
            payload: encounterList,
        }),
    get: () => ipcRenderer.invoke('message', { type: ipcActions.ENCOUNTER_STORE.GET }),
});

contextBridge.exposeInMainWorld('system', {
    openInBrowser: url => shell.openExternal(url),
    openChildWindow: (path, browserOptions) =>
        ipcRenderer.invoke('openChildWindow', { path, browserOptions }),
});
