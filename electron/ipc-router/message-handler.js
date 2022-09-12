const isDev = require('electron-is-dev');

class MessageHandler {
    ipcActions = require('../../src/shared/ipc-actions');
    appController = require('./controllers/app-controller');
    filestoreController = require('./controllers/filestore-controller');
    settingsController = require('./controllers/settings-controller');
    pcController = require('./controllers/pc-controller');
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
    }
    async handle (action) {
        if (isDev) console.log(`Handling message type: ${action.type}`);
        switch(action.type) {
            // App Actions
            case this.ipcActions.APP.QUIT:
                return this.appController.quitApp();
            case this.ipcActions.APP.GETVERSION:
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
            // Settings Actions
            case this.ipcActions.SETTINGS.GET_AREAS:
                return await this.settingsController.getAreas();
            case this.ipcActions.SETTINGS.GET:
                return await this.settingsController.get(action.payload);
            case this.ipcActions.SETTINGS.UPDATE:
                return await this.settingsController.update(action.payload, this.mainWindow);
            // Player Character Actions
            case this.ipcActions.PCS.WRITE:
                return await this.pcController.write(action.payload, this.mainWindow);
            case this.ipcActions.PCS.GETALL:
                return await this.pcController.getAll();
            case this.ipcActions.PCS.DELETE:
                return await this.pcController.delete(action.payload, this.mainWindow);
            case this.ipcActions.PCS.GET:
                return await this.pcController.get(action.payload);
            default:
                console.error(`Unrecognized message: ${JSON.stringify(action, null, 2)}`);
        }
    }
}

module.exports = MessageHandler