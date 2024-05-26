const DatabaseRepository = require('../../lib/db');
const encounterStoreRepo = new DatabaseRepository('encounterStore');

module.exports = {
    write: async (encounter) => {
        return await encounterStoreRepo.write(encounter);
    },
    get: async (payload) => await encounterStoreRepo.read(payload.filter, payload.sort),
    getOne: async (_id) => (await encounterStoreRepo.read({_id}))[0],
    delete: async (_id) => {
        return await encounterStoreRepo.delete(_id);
    },
}