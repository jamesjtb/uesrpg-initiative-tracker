import { encounterActions } from './values';

const addCombatant = (oldState, combatant) => {
    const newEncounter = { ...oldState, combatants: [...oldState.combatants, combatant] };
    window.activeEncounter.write(newEncounter); // eventual consistency
    return newEncounter;
};

const editCombatant = (oldState, newCombatant) => {
    const newEncounter = {
        ...oldState,
        combatants: [
            ...oldState.combatants.map(c => (c.id === newCombatant.id ? newCombatant : c)),
        ],
    };
    window.activeEncounter.write(newEncounter);
    return newEncounter;
};

const removeCombatant = (oldState, combatantId) => {
    const newEncounter = {
        ...oldState,
        combatants: [...oldState.combatants.filter(c => c.id !== combatantId)],
    };
    window.activeEncounter.write(newEncounter);
    return newEncounter;
};

const set = (_, encounter) => {
    return encounter;
};

const actionTypesMap = {
    [encounterActions.ADD_COMBATANT]: addCombatant,
    [encounterActions.REMOVE_COMBATANT]: removeCombatant,
    [encounterActions.EDIT_COMBATANT]: editCombatant,
    [encounterActions.SET]: set,
};

export const encounterReducer = (oldState, action) => {
    if (actionTypesMap[action.type]) {
        return actionTypesMap[action.type](oldState, action.payload);
    }
    throw new Error(`Unrecognized encounter action in reducer: ${action.type}`);
};
