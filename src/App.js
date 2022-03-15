import React from 'react';

import classes from './App.module.css';

import Box from '@mui/material/Box';

import TopBar from './containers/TopBar';
import InitiativeList from './containers/InitiativeList';
import InitiativeModal from './containers/InitiativeModal';
import SettingsModal from './containers/SettingsModal';

import parchmentBackground from './assets/parchment.jpg';

import { CombatProvider } from './contextProviders/combat';
import { SettingsProvider } from './contextProviders/settings';

function App() {

  // const handleKeyPress = (e) => {
  //   if (e.ctrlKey && e.shiftKey && e.key === ' ') return handleCombatStop();
  //   if (e.ctrlKey && e.key === " ") combatState.round < 0 ? handleCombatStart() : advanceTurn(1);
  //   if (e.ctrlKey && e.key === 'Backspace') advanceTurn(-1);
  // };

  return (
    // onKeyDown={handleKeyPress}
    <Box tabIndex="0" className={classes.App} style={{ backgroundImage: `url(${parchmentBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
      <SettingsProvider>
        <CombatProvider>
          <TopBar />
          <Box style={{ overflowY: 'auto' }}>
            <Box className={classes.InitiativeContainer}>
              <InitiativeList />
            </Box>
            <InitiativeModal />
            <SettingsModal />
          </Box>
        </CombatProvider>
      </SettingsProvider>
    </Box>
  );
}

export default App;
