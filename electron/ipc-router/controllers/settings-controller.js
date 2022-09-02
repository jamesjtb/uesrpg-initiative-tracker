const SettingsRepository = require('../../lib/settings-repository');

const settingsRepo = new SettingsRepository();
const ipcActions = require('../../../src/shared/ipc-actions');

module.exports = {
    get: async (settingArea) => settingsRepo.get(settingArea),
    update: async (settingUpdate, mainWindow) => {
        await settingsRepo.update(settingUpdate);
        mainWindow.webContents.send(ipcActions.SETTINGS.ON_UPDATE);
        return
    },
    getAreas: () => settingsRepo.getAreas(),
}