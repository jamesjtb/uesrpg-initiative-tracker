const { app } = require('electron');
const url = require('url');
const path = require('path');

class MessageHandler {
    appController = require('./controllers/app-controller');
    bestiaryController = require('./controllers/bestiary-controller');
    activeEncounterController = require('./controllers/active-encounter-controller');
    filestoreController = require('./controllers/filestore-controller');
    ipcActions = require('../../src/shared/ipc-actions');
    pcController = require('./controllers/pc-controller');
    settingsController = require('./controllers/settings-controller');

    constructor(mainWindow) {
        this.mainWindow = mainWindow;
    }
    async handle(action) {
        if (!app.isPackaged) console.log(`----\nIPC Message\n    TYPE: "${action.type}"\n    PAYLOAD: ${JSON.stringify(action.payload)}\n----`);
        switch (action.type) {
            // App Actions
            case this.ipcActions.APP.QUIT:
                return this.appController.quitApp();
            case this.ipcActions.APP.GETVERSION:
                return this.appController.getAppVersion();
            case this.ipcActions.APP.USERSETTINGS.LOAD:
                return await this.appController.loadUserSettings();
            case this.ipcActions.APP.USERSETTINGS.SAVE:
                return await this.appController.saveUserSettings(action.payload);
            case this.ipcActions.APP.GET_ROOT_PATH:                
                return app.isPackaged
                ? url.format({
                      pathname: path.join(__dirname, '../index.html'),
                      protocol: 'file:',
                      slashes: true,
                  })
                : 'http://localhost:3000';
            // Filestore Actions
            case this.ipcActions.FILESTORE.SAVE_COMBATANTS:
                return await this.filestoreController.saveCombatants(
                    action.payload,
                    this.mainWindow
                );
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
            case this.ipcActions.PCS.GET:
                return await this.pcController.get(action.payload);
            case this.ipcActions.PCS.DELETE:
                return await this.pcController.delete(action.payload, this.mainWindow);
            case this.ipcActions.PCS.GETONE:
                return await this.pcController.getOne(action.payload);
            // Bestiary Actions
            case this.ipcActions.BESTIARY.WRITE:
                return await this.bestiaryController.write(action.payload, this.mainWindow);
            case this.ipcActions.BESTIARY.GET:
                return await this.bestiaryController.get(action.payload);
            case this.ipcActions.BESTIARY.DELETE:
                return await this.bestiaryController.delete(action.payload, this.mainWindow);
            case this.ipcActions.BESTIARY.GETONE:
                return await this.bestiaryController.getOne(action.payload);
            // Active Encounter Actions
            case this.ipcActions.ACTIVE_ENCOUNTER.WRITE:
                return await this.activeEncounterController.write(action.payload);
            case this.ipcActions.ACTIVE_ENCOUNTER.GET:
                return await this.activeEncounterController.get();
            // Encounter Store Actions
            case this.ipcActions.ENCOUNTER_STORE.WRITE:
                return await this.encounterStoreController.write(action.payload);
            case this.ipcActions.ENCOUNTER_STORE.GET:
                return await this.encounterStoreController.get(action.payload);
            case this.ipcActions.ENCOUNTER_STORE.DELETE:
                return await this.encounterStoreController.delete(action.payload);
            case this.ipcActions.ENCOUNTER_STORE.GETONE:
                return await this.encounterStoreController.getOne(action.payload);
            default:
                console.error(`Unrecognized message: ${JSON.stringify(action, null, 2)}`);
        }
    }
}

module.exports = MessageHandler;
