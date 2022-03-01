import React from 'react';

import classes from './App.module.css';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import TopBar from './containers/TopBar';
import InitiativeList from './containers/InitiativeList';
import InitiativeModal from './containers/InitiativeModal';

import parchmentBackground from './assets/parchment.jpg';

import { CombatProvider } from './contextProviders/combat';

function App() {

  // const handleKeyPress = (e) => {
  //   if (e.ctrlKey && e.shiftKey && e.key === ' ') return handleCombatStop();
  //   if (e.ctrlKey && e.key === " ") combatState.round < 0 ? handleCombatStart() : advanceTurn(1);
  //   if (e.ctrlKey && e.key === 'Backspace') advanceTurn(-1);
  // };

  return (
    // onKeyDown={handleKeyPress}
    <Box tabIndex="0" className={classes.App} style={{ backgroundImage: `url(${parchmentBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
      <CombatProvider>
        <TopBar />
        <Box style={{ overflowY: 'auto' }}>
          <Container className={classes.InitiativeContainer}>
            <InitiativeList />
          </Container>
          <InitiativeModal />
        </Box>
      </CombatProvider>
    </Box>
  );
}

export default App;
