const PlayerCharacterRepository = require('../../lib/player-character-repository');

const playerCharacterRepo = new PlayerCharacterRepository();

module.exports = {
    write: async (pc) => await playerCharacterRepo.write(pc),
    getAll: async () => await playerCharacterRepo.read(),
}