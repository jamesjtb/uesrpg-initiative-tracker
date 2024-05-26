module.exports = {
    APP: {
        QUIT: 'app:quit',
        GETVERSION: 'app:getversion',
        USERSETTINGS: {
            LOAD: "app:usersettings:load",
            SAVE: "app:usersettings:save",
        },
    },
    FILESTORE: {
        SAVE_COMBATANTS: 'saveCombatants',
        LOAD_FILE: 'loadFile',
    },
    SETTINGS: {
        GET: 'settings:get',
        UPDATE: 'settings:update',
        GET_TYPES: 'settings:get-types',
        GET_AREAS: 'settings:get-areas',
        ON_UPDATE: 'settings:on-update',
    },
    PCS: {
        GET: 'pcs:get',
        GETONE: 'pcs:getone',
        WRITE: 'pcs:write',
        DELETE: 'pcs:delete',
        ON_UPDATE: 'pcs.on-update',
    },
    BESTIARY: {
        GET: 'bestiary:get',
        GETONE: 'bestiary:getone',
        WRITE: 'bestiary:write',
        DELETE: 'bestiary:delete',
        ON_UPDATE: 'bestiary:on-update',
    },
    ACTIVE_ENCOUNTER: {
        GET: 'activeEncounter:get',
        WRITE: 'activeEncounter:write',
        ON_UPDATE: 'activeEncounter:on-update',
    },
    ENCOUNTER_STORE: {
        GET: 'encounterStore:get',
        GETONE: 'encounterStore:getone',
        WRITE: 'encounterStore:write',
        DELETE: 'encounterStore:delete',
    },
};