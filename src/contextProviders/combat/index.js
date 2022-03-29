import React, { useReducer, createContext } from 'react';
import { combatReducer } from './reducer';
import { combatActions } from './values';

export const CombatContext = createContext();

export const CombatProvider = props => {
  const initialState = {
    round: -1, // Round -1 = out of combat, round 0=rolling initiative, round 1 and up = proper rounds
    turn: 0,
    activeCombatantId: null, // null until round 1 begins,
    combatants: []
  };

  const [ state, dispatch ] = useReducer(combatReducer, initialState);

  /* General Combat functions */
  const initiateCombat = () => {
    dispatch({ type: combatActions.INITIATE });
  };

  const startCombat = ({ startingCharacterId }) => {
    dispatch({ type: combatActions.START, payload: { startingCharacterId } });
  };

  const stopCombat = () => {
    dispatch({ type: combatActions.STOP });
  };

  const advanceTurn = ({ byTurns, combatants, apRefreshType }) => {
    dispatch({ type: combatActions.ADVANCE_TURN, payload: { byTurns, combatants, apRefreshType } })
  };

  const setActiveCombatant = (combatantId) => {
    dispatch({ type: combatActions.SET_ACTIVE_COMBATANT, payload: { combatantId } });
  };

  /* Combatant Specific Functions */  
  const setCombatants = newCombatants => {
    dispatch({ type: combatActions.SET_COMBATANTS, payload: newCombatants });
  };

  const addCombatant = (type) => {
    dispatch({ type: combatActions.ADD_NEW_COMBATANT, payload: { type } });
  };

  const editCombatant = combatant => {
    dispatch({ type: combatActions.EDIT_COMBATANT, payload: combatant  });
  };

  const commitCombatant = combatant => {
    dispatch({ type: combatActions.COMMIT_COMBATANT, payload: combatant });
  };

  const deleteCombatant = combatant => {
    dispatch({ type: combatActions.DELETE_COMBATANT, payload: combatant });
  };

  const duplicateCombatant = combatant => {
    dispatch({ type: combatActions.DUPLICATE_COMBATANT, payload: combatant });
  };

  return (
    <CombatContext.Provider
      value={{
        combatState: state,
        initiateCombat,
        startCombat,
        stopCombat,
        advanceTurn,
        setActiveCombatant,
        setCombatants,
        addCombatant,
        editCombatant,
        commitCombatant,
        deleteCombatant,
        duplicateCombatant
      }}
    >
      {props.children}
    </CombatContext.Provider>
  );

}
