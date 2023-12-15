const DatabaseRepository = require('../../lib/db');
const activeEncounterRepo = new DatabaseRepository('activeEncounter');

module.exports = {
    write: async (encounter) => {
        return await activeEncounterRepo.write(encounter);
    },
    get: async () => {
        return (await activeEncounterRepo.read())[0];
    }
};