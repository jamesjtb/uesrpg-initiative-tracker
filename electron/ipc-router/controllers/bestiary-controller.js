const DatabaseRepository = require('../../lib/db');
const bestiaryRepo = new DatabaseRepository('bestiary');

const ipcActions = require('../../../src/shared/ipc-actions');
module.exports = {
    write: async (pc, mainWindow) => {
        const result = await bestiaryRepo.write(pc);
        mainWindow.webContents.send(ipcActions.BESTIARY.ON_UPDATE);
        return result;
    },
    getAll: async () => await bestiaryRepo.read(),
    get: async (_id) => (await bestiaryRepo.read({_id}))[0],
    delete: async (_id, mainWindow) => {
        const result = await bestiaryRepo.delete(_id);
        mainWindow.webContents.send(ipcActions.BESTIARY.ON_UPDATE);
        return result;
    },
}