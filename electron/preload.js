const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fs', {
  saveCombatants: (type, combatants) => ipcRenderer.invoke('saveCombatants', {type, combatants})
})