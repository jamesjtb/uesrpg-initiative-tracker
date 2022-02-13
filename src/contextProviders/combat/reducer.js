import { combatActions } from './values';

export const combatReducer = (oldState, action) => {
  switch (action.type) {
    // Initiate combat
    case combatActions.INITIATE:
      return { ...oldState, round: 0 };
    case combatActions.START:
      return {
        ...oldState,
        round: 1,
        turn: 1,
        activeCharacterId: action.payload.startingCharacterId
      };
    // Stop Combat
    case combatActions.STOP:
      return {
        ...oldState,
        round: -1,
        activeCharacterId: null,
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
        activeCharacterId: resultActiveCharacterId
      };
  }
};