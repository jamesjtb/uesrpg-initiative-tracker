import { createContext, useEffect, useReducer } from 'react';
import { encounterListReducer } from './reducer';

export const EncounterListContext = createContext();

export const EncounterListProvider = props => {
    const [state, dispatch] = useReducer(encounterListReducer, []);

    useEffect(() => {
        (async () => {
            const existingEncounterList = await window.encounterList.get();
            dispatch({ type: 'SET', payload: existingEncounterList ?? [] });
            console.log('Encounter List Initialized!');
        })();
    }, []);

    const addEncounter = encounter => {
        dispatch({ type: 'ADD_ENCOUNTER', payload: encounter });
    };

    return (
        <EncounterListContext.Provider value={{ encounterList: state, addEncounter }}>
            {props.children}
        </EncounterListContext.Provider>
    );
};
