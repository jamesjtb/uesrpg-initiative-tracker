import React, {useReducer, createContext} from 'react';
import { combatantReducer } from './reducer';
import { combatantActions } from './values';

export const CombatantContext = createContext();

export const CombatantProvider = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(combatantReducer, initialState);

  const setCombatants = newCombatants => {
    dispatch({ type: combatantActions.SET_COMBATANTS, payload: newCombatants });
  };

  const addCombatant = (type) => {
    dispatch({ type: combatantActions.ADD_NEW, payload: { type } });
  };

  const editCombatant = combatant => {
    dispatch({ type: combatantActions.EDIT, payload: combatant  });
  };

  const commitCombatant = combatant => {
    dispatch({ type: combatantActions.COMMIT, payload: combatant });
  };

  const deleteCombatant = combatant => {
    dispatch({ type: combatantActions.DELETE, payload: combatant });
  }

  return (
    <CombatantContext.Provider
      value={{
        combatants: state,
        setCombatants,
        addCombatant,
        editCombatant,
        commitCombatant,
        deleteCombatant
      }}
    >
      {props.children}
    </CombatantContext.Provider>
  );
};