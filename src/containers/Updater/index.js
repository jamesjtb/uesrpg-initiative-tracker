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
  
  const  updateState = useRef(updateStates.STARTUP);

  const checkForUpdates = () => {
    updateState.current = updateStates.CHECKING;
  };

  useEffect(() => {
    (async () => {
      if (updateState.current !== updateStates.STARTUP) return;
      updateState.current = updateState.INITIALIZING;
      const returnedSettings = await settingsIpc.get('general');
      setCheckForUpdatesValue(returnedSettings.checkForUpdates.value);
    })();
  }, []);

  useEffect(() => {
    if (checkForUpdatesValue === true) checkForUpdates();
  }, [checkForUpdatesValue])

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