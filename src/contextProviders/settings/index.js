import React, { useReducer, createContext, useEffect, useRef } from 'react';

import { settingsReducer } from './reducer';

import { defaultSettings, settingsActions } from './values';

export const SettingsContext = createContext();

export const SettingsProvider = props => {
  const initialLoadDone = useRef(false);
  const initialState = { modal: defaultSettings.modal, userSettings: []};

  const [ state, dispatch ] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    window.fs.loadSettings().then(userSettings => {
      if (userSettings) {
        dispatch({ type: settingsActions.SET_USER_SETTINGS, payload: { userSettings }});
        console.log("Loaded User Settings from file");
      } else {
        dispatch({ type: settingsActions.SET_USER_SETTINGS, payload: { userSettings: [ ...defaultSettings.userSettings ] } });
      }
      initialLoadDone.current = true;
    });
  }, []);

  useEffect(() => {
    if (initialLoadDone.current) {  
      window.fs.saveSettings(state.userSettings).then(() => console.log('Saved user settings'));
    }
  }, [ state.userSettings ]);

  /* Settings Modal functions */
  const setSettingsModalOpen = (newOpenValue) => {
    dispatch({ type: settingsActions.SET_MODAL_OPEN, payload: { newOpenValue } })
  };

  /* Setting Item Functions */
  const updateSettingItem = (settingsAreaId, settingItem) => {
    dispatch({ type: settingsActions.UPDATE_SETTING_ITEM, payload: { settingsAreaId, settingItem }});
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsState: state,
        setSettingsModalOpen,
        updateSettingItem
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};