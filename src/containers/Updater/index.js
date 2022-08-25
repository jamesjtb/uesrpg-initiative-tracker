import React, { useContext, useEffect, useRef, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { SettingsContext } from '../../contextProviders/settings';

import { delay } from '../../util/utils';

const updateStates = {
  STARTUP: 'STARTUP',
  INITIALIZING: 'INITIALIZING',
  ALERTCLOSED: 'ALERTCLOSED',
  CHECKING: 'CHECKING',
  OUTDATED: 'OUTDATED',
  CURRENT: 'CURRENT'
};

const Updater = () => {
  const { settingsState, initialLoadDone } = useContext(SettingsContext);
  const [ latestVersion, setLatestVersion ] = useState(null);
  
  const  updateState = useRef(updateStates.STARTUP);

  const checkForUpdates = () => {
    updateState.current = updateStates.CHECKING;
  };

  const awaitLoadedSettingsFromFile = async () => {
    for (let i = 0; i < 100; i++) {
      await delay(1000);
      if (initialLoadDone.current === true) return;
    }
    throw new Error('Awaiting load settings from file timed out.');
  }

  const awaitUserSettings = async () => {
    for (let i = 0; i < 100; i++) {
      console.log(settingsState);
      await delay(100);
      if (settingsState.userSettings.length > 0) return;
    }
    throw new Error('Awaiting User Settings timed out');
  };

  useEffect(() => {
    (async () => {
      if (updateState.current !== updateStates.STARTUP) return;
      updateState.current = updateState.INITIALIZING;
      await awaitLoadedSettingsFromFile();
      // if (settingsState.userSettings.length < 1) awaitUserSettings();
      console.log(settingsState, initialLoadDone);
      for (const settingsArea of settingsState.userSettings) {
        if (settingsArea.displayName === 'General') {
          for (const settingItem of settingsArea.settingItems) {
            if (settingItem.displayName === 'Automatically Check for Updates') {
              if (settingItem.value === true) checkForUpdates();
            }
          }
        }
      }
    })();
  }, [initialLoadDone.current, settingsState.userSettings]);

  return (
    <Snackbar
      open={[ updateStates.CHECKING, updateStates.OUTDATED, updateStates.CURRENT ].includes(updateState.current)}
      autoHideDuration={6000}
      onClose={() => updateState.current = updateStates.ALERTCLOSED}
    >
      <Alert
        onClose={() => updateState.current = updateStates.ALERTCLOSED}
      />
    </Snackbar>
  );
};

export default Updater;