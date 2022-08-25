class MessageHandler {
    ipcActions = require('../../src/shared/ipc-actions');
    appController = require('./controllers/app-controller');
    filestoreController = require('./controllers/filestore-controller');
    settingsController = require('./controllers/settings-controller');
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
    }
    async handle (action) {
        switch(action.type) {
            // App Actions
            case this.ipcActions.APP.QUIT:
                return this.appController.quitApp();
            case this.ipcActions.APP.VERSION:
                return this.appController.getAppVersion();
            case this.ipcActions.APP.USERSETTINGS.LOAD:
                return await this.appController.loadUserSettings();
            case this.ipcActions.APP.USERSETTINGS.SAVE:
                return await this.appController.saveUserSettings(action.payload);
            // Filestore Actions
            case this.ipcActions.FILESTORE.SAVE_COMBATANTS:
                return await this.filestoreController.saveCombatants(action.payload, this.mainWindow);
            case this.ipcActions.FILESTORE.LOAD_FILE:
                return await this.filestoreController.loadFile(this.mainWindow);
            default:
                console.error(`Unrecognized message: ${JSON.stringify(action, null, 2)}`);
        }
    }
}

module.exports = MessageHandler