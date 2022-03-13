import React, { useReducer, createContext, useEffect } from 'react';

import { settingsReducer } from './reducer';

import { defaultSettings, settingsActions } from './values';

export const SettingsContext = createContext();

export const SettingsProvider = props => {
  const initialState = defaultSettings;

  const [ state, dispatch ] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    console.log('Load the settings file here');
  }, []);

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