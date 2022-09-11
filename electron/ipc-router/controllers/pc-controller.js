const PlayerCharacterRepository = require('../../lib/player-character-repository');

const playerCharacterRepo = new PlayerCharacterRepository();
const ipcActions = require('../../../src/shared/ipc-actions');
module.exports = {
    write: async (pc, mainWindow) => {
        const result = await playerCharacterRepo.write(pc);
        mainWindow.webContents.send(ipcActions.PCS.ON_UPDATE);
        return result;
    },
    getAll: async () => await playerCharacterRepo.read(),
}