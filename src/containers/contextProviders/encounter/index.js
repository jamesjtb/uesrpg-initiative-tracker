import React, { useReducer, createContext } from 'react';
import { encounterReducer } from './reducer';
import { encounterActions } from './values';

export const EncounterContext = createContext();

export const EncounterProvider = props => {
    const initialState = {
        _id: `${new Date().valueOf()}`,
        name: "New Encounter",
        description: "",
        displayPath: "/",
        combatants: []
    };

    const [ state, dispatch ] = useReducer(encounterReducer, initialState);

    const addCombatant = ({ combatant }) => {
        dispatch({ type: encounterActions.ADD_COMBATANT, payload: combatant});
    }

    return (
        <EncounterContext.Provider
            value={{
                encounterState: state,
                addCombatant
            }}
        >
            {props.children}
        </EncounterContext.Provider>
    )
};
