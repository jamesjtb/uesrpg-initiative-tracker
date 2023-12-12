import { encounterActions } from './values';

const addCombatant = (oldState, combatant) => {
    return {...oldState, combatants: [...oldState.combatants, combatant]};
};

const actionTypesMap = {[encounterActions.ADD_COMBATANT]: addCombatant};

export const encounterReducer = (oldState, action) => {
    if (actionTypesMap[action.type]) {
        return actionTypesMap[action.type](oldState, action.payload);
    }
    throw new Error(`Unrecognized encounter action in reducer: ${action.type}`);
}