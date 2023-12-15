import { encounterActions } from './values';

const addCombatant = (oldState, combatant) => {
    const newEncounter = { ...oldState, combatants: [...oldState.combatants, combatant] };
    window.activeEncounter.write(newEncounter); // eventual consistency
    return newEncounter;
};

const set = (_, encounter) => {
    return encounter
};

const actionTypesMap = {
    [encounterActions.ADD_COMBATANT]: addCombatant,
    [encounterActions.SET]: set,
};

export const encounterReducer = (oldState, action) => {
    if (actionTypesMap[action.type]) {
        return actionTypesMap[action.type](oldState, action.payload);
    }
    throw new Error(`Unrecognized encounter action in reducer: ${action.type}`);
};
