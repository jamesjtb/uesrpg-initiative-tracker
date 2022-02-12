import React, {useReducer, createContext} from 'react';
import { combatantReducer } from './reducer';
import { combatantActions } from './actions';

export const CombatantContext = createContext();

export const CombatantProvider = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(combatantReducer, initialState);

  const setCombatants = newCombatants => {
    dispatch({ type: combatantActions.SET_COMBATANTS, payload: newCombatants });
  };

  return (
    <CombatantContext.Provider
      value={{
        combatants: state,
        setCombatants
      }}
    >
      {props.children}
    </CombatantContext.Provider>
  );
};