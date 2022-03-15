const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fs', {
  saveCombatants: (type, combatants) => ipcRenderer.invoke('saveCombatants', {type, combatants}),
  loadFile: () => ipcRenderer.invoke('loadFile'),
  saveSettings: (userSettings) => ipcRenderer.invoke('app:usersettings:save', { userSettings }),
  loadSettings: () => ipcRenderer.invoke('app:usersettings:load')
});

contextBridge.exposeInMainWorld('app', {
  quit: () => ipcRenderer.invoke('app:quit')
});