import { encounterListActions } from './values';

const addEncounter = (oldState, encounter) => {
    const newEncounterList = [...oldState, encounter];
    window.encounterList.write(newEncounterList);
    return newEncounterList;
};

const setEncounterList = (_, encounterList) => {
    window.encounterList.write(encounterList);
    return encounterList;
};

const actionTypesMap = {
    [encounterListActions.ADD_ENCOUNTER]: addEncounter,
    [encounterListActions.SET]: setEncounterList,
};

export const encounterListReducer = (oldState, action) => {
    if (actionTypesMap[action.type]) {
        return actionTypesMap[action.type](oldState, action.payload);
    }
    throw new Error(`Unrecognized encounter list action in reducer: ${action.type}`);
};