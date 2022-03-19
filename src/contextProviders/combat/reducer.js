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
  if (!Array.isArray(combatant.conditions)) combatant.conditions=[];
  return correctedObject;
};

export const combatReducer = (oldState, action) => {
  switch (action.type) {
    /********** General Combat Actions ************/
    // Initiate combat
    case combatActions.INITIATE:
      return { ...oldState, combatants: [...oldState.combatants], round: 0 };
    case combatActions.START:
      return {
        ...oldState,
        combatants: [...oldState.combatants.map(oldCombatant => ({ ...oldCombatant, conditions: [ ...oldCombatant.conditions ]}))],
        round: 1,
        turn: 1,
        activeCombatantId: action.payload.startingCharacterId
      };
    // Stop Combat
    case combatActions.STOP:
      return {
        ...oldState,
        combatants: [...oldState.combatants.map(oldCombatant => ({ ...oldCombatant, conditions: [ ...oldCombatant.conditions ]}))],
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
      const resultCombatants = [...oldState.combatants.map(oldCombatant => ({ ...oldCombatant, conditions: [ ...oldCombatant.conditions ]}))];
      if (action.payload.apRefreshType === "UESRPG 3e v2" && resultRound - oldState.round === 1) { // 3e v2 AP refreshing
        for (const resultCombatant of resultCombatants) {
          resultCombatant.currentActionPoints = resultCombatant.maxActionPoints;
        }
      }
      if (action.payload.apRefreshType === 'UESRPG 3e v3') { // 3e v3 AP refreshing
        for (const resultCombatant of resultCombatants) {
          if (resultCombatant.id === resultActiveCharacterId)
            resultCombatant.currentActionPoints = resultCombatant.maxActionPoints;
        }
      }
      return {
        ...oldState,
        combatants: resultCombatants,
        round: resultRound,
        turn: resultTurn,
        activeCombatantId: resultActiveCharacterId
      };

      /********* Combatant-specific Actions *********/
      // Complete overwrite of the comabtants array
      case combatActions.SET_COMBATANTS:
        const normalizedCombatants = action.payload.map(combatant => correctDataTypes(combatant));
        return {
          ...oldState,
          combatants: normalizedCombatants.map(normalizedCombatant => ({ ...normalizedCombatant, conditions: [ ...normalizedCombatant.conditions ]}))
        };
      // Add a new combatant
      case combatActions.ADD_NEW_COMBATANT:
        return {
          ...oldState,
          combatants: [
            ...oldState.combatants.map(oldCombatant => ({ ...oldCombatant, conditions: [ ...oldCombatant.conditions ]})),
            { ...defaultCombatant, id: uuid(), type: action.payload.type, conditions: [ ...defaultCombatant.conditions ]}
          ]
        };
      // Duplicate a combatant
      case combatActions.DUPLICATE_COMBATANT:
        return {
          ...oldState,
          combatants: [
            ...oldState.combatants.map(oldCombatant => ({ ...oldCombatant, conditions: [ ...oldCombatant.conditions ] })),
            { ...action.payload, id: uuid(), status: combatantStatuses.CREATING, conditions: [ ...action.payload.conditions ] }
          ]
        }
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
            combatant.id === action.payload.id ?
              { ...combatant, status: combatantStatuses.COMMITTED, conditions: [ ...combatant.conditions ] }
              : { ...combatant, conditions: [ ...combatant.conditions ] }
          ))
        };
      // Delete a combatant
      case combatActions.DELETE_COMBATANT:
        return {
          ...oldState,
          combatants: oldState.combatants
            .filter(combatant => action.payload.id !== combatant.id)
            .map(combatant => ({ ...combatant, conditions: [ ...combatant.conditions ] }))
        };
    default:
      throw new Error(`Unrecognized combatant action in reducer: ${action.type}`);
  }
};