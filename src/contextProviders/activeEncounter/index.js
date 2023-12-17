/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, createContext, useEffect } from 'react';
import { encounterReducer } from './reducer';
import { encounterActions } from './values';

export const EncounterContext = createContext();

export const EncounterProvider = props => {
    const [state, dispatch] = useReducer(encounterReducer, undefined);

    useEffect(() => {
        if (!state) {
            (async () => {
                const existingActiveEncounter = await window.activeEncounter.get();
                dispatch({
                    type: encounterActions.SET,
                    payload: existingActiveEncounter ?? {
                        _id: `${new Date().valueOf()}`,
                        name: 'New Encounter',
                        description: '',
                        displayPath: '/',
                        combatants: [],
                    },
                });
                console.log('Active Encounter Initialized!');
            })();
        }
    }, []);

    const addCombatant = combatant => {
        dispatch({ type: encounterActions.ADD_COMBATANT, payload: combatant });
    };

    const removeCombatant = combatantId => {
        dispatch({ type: encounterActions.REMOVE_COMBATANT, payload: combatantId });
    }

    return (
        <EncounterContext.Provider
            value={{
                encounterState: state,
                addCombatant,
                removeCombatant,
            }}
        >
            {props.children}
        </EncounterContext.Provider>
    );
};
