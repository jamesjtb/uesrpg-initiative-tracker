import React, { useEffect, useRef, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const updateStates = {
  STARTUP: 'STARTUP',
  INITIALIZING: 'INITIALIZING',
  ALERTCLOSED: 'ALERTCLOSED',
  CHECKING: 'CHECKING',
  OUTDATED: 'OUTDATED',
  CURRENT: 'CURRENT'
};

const settingsIpc = window.settings;

const Updater = () => {
  const [ latestVersion, setLatestVersion ] = useState(null);
  const [ checkForUpdatesValue, setCheckForUpdatesValue ] = useState(null);
  const [ updateState, setUpdateState ] = useState(updateStates.STARTUP);

  useEffect(() => {
    (async () => {
      if (updateState !== updateStates.STARTUP) return;
      setUpdateState(updateState.INITIALIZING);
      const returnedSettings = await settingsIpc.get('general');
      setCheckForUpdatesValue(returnedSettings.checkForUpdates.value);
    })();
  }, [updateState, setUpdateState]);

  useEffect(() => {
    if (checkForUpdatesValue === true) {
        setUpdateState(updateStates.CHECKING);
    }
  }, [checkForUpdatesValue, setUpdateState])

  return (
    <Snackbar
      open={[ updateStates.CHECKING, updateStates.OUTDATED, updateStates.CURRENT ].includes(updateState)}
      autoHideDuration={6000}
      onClose={() => setUpdateState(updateStates.ALERTCLOSED)}
    >
      <Alert
        onClose={() => setUpdateState(updateStates.ALERTCLOSED)}
      />
    </Snackbar>
  );
};

export default Updater;