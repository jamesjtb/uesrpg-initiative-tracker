import React, { useReducer, createContext } from 'react';
import { combatReducer } from './reducer';
import { combatActions } from './values';

export const CombatContext = createContext();

export const CombatProvider = props => {
  const initialState = {
    round: -1, // Round -1 = out of combat, round 0=rolling initiative, round 1 and up = proper rounds
    turn: 0,
    activeCombatantId: null, // null until round 1 begins
  };

  const [ state, dispatch ] = useReducer(combatReducer, initialState);

  const initiateCombat = () => {
    dispatch({ type: combatActions.INITIATE });
  };

  const startCombat = ({ startingCharacterId }) => {
    dispatch({ type: combatActions.START, payload: { startingCharacterId } });
  };

  const stopCombat = () => {
    dispatch({ type: combatActions.STOP });
  };

  const advanceTurn = ({ byTurns, combatants }) => {
    dispatch({ type: combatActions.ADVANCE_TURN, payload: { byTurns, combatants} })
  };

  return (
    <CombatContext.Provider
      value={{
        combatState: state,
        initiateCombat,
        startCombat,
        stopCombat,
        advanceTurn
      }}
    >
      {props.children}
    </CombatContext.Provider>
  );

}
