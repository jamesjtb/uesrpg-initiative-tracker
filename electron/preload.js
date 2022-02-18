const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fs', {
  saveCombatants: (type, combatants) => ipcRenderer.invoke('saveCombatants', {type, combatants}),
  loadFile: () => ipcRenderer.invoke('loadFile')
});

contextBridge.exposeInMainWorld('app', {
  quit: () => ipcRenderer.invoke('app:quit')
});