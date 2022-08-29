const SettingsRepository = require('../../lib/settings-repository');

const settingsRepo = new SettingsRepository();

module.exports = {
    get: async (settingArea) => settingsRepo.get(settingArea),
    update: async (settingUpdate) => settingsRepo.update(settingUpdate),
    getAreas: () => settingsRepo.getAreas(),
}