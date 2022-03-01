import { uuid } from '../../util/utils';
import { combatActions, combatantStatuses, defaultCombatant, combatantIntegerFields } from './values';

// Normalize data types in one place rather than at each edit point
const correctDataTypes = combatant => {
  const correctedObject = {};
  for (const field in combatant) {
    if (combatantIntegerFields.includes(field)) {
      correctedObject[field] = parseInt(combatant[field]);
      continue;
    };
    correctedObject[field] = combatant[field];
  }
  return correctedObject;
};

export const combatReducer = (oldState, action) => {
  switch (action.type) {
    /********** General Combat Actions ************/
    // Initiate combat
    case combatActions.INITIATE:
      return { ...oldState, round: 0 };
    case combatActions.START:
      return {
        ...oldState,
        round: 1,
        turn: 1,
        activeCombatantId: action.payload.startingCharacterId
      };
    // Stop Combat
    case combatActions.STOP:
      return {
        ...oldState,
        round: -1,
        activeCombatantId: null,
        turn: 0
      };
    case combatActions.ADVANCE_TURN:
      if (oldState.round < 1) return; // Can't advance turn if combat is not running
      if (oldState.turn + action.payload.byTurns === 0 && oldState.round === 1) return; // Can't go to turn 0 round 1
      const resultTurn = oldState.turn + action.payload.byTurns > action.payload.combatants.length ?
        1 :
        oldState.turn + action.payload.byTurns === 0 ?
          action.payload.combatants.length : 
          oldState.turn + action.payload.byTurns;
      const resultRound = oldState.turn + action.payload.byTurns === 0 ? oldState.round - 1 :
        oldState.turn + action.payload.byTurns > action.payload.combatants.length ?
          oldState.round + 1 : oldState.round;
      const resultActiveCharacterId = action.payload.combatants[resultTurn - 1].id;
      return {
        round: resultRound,
        turn: resultTurn,
        activeCombatantId: resultActiveCharacterId
      };

      /********* Combatant-specific Actions *********/
      // Complete overwrite of the comabtants array
      case combatActions.SET_COMBATANTS:
        return {
          ...oldState,
          combatants: [...action.payload]
        };
      // Add a new combatant
      case combatActions.ADD_NEW_COMBATANT:
        return {
          ...oldState,
          combatants: [
            ...oldState.combatants,
            { ...defaultCombatant, id: uuid(), type: action.payload.type}
          ]
        };
      // Edit an existing combatant
      case combatActions.EDIT_COMBATANT:
        return {
          ...oldState,
          combatants: oldState.combatants.map(combatant => (
            combatant.id === action.payload.id ? correctDataTypes({ ...action.payload }) : combatant
          ))
        };
      // Commit a combatant in CREATING status
      case combatActions.COMMIT_COMBATANT:
        return {
          ...oldState,
          combatants: oldState.combatants.map(combatant => (
            combatant.id === action.payload.id ? { ...combatant, status: combatantStatuses.COMMITTED } : combatant
          ))
        };
      // Delete a combatant
      case combatActions.DELETE_COMBATANT:
        return {
          ...oldState,
          combatants: oldState.Combatants.filter(combatant => action.payload.id !== combatant.id)
        };
    default:
      throw new Error(`Unrecognized combatant action in reducer: ${action.type}`);
  }
};