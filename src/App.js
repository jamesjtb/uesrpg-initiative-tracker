import React, { useState, createContext } from 'react';

import classes from './App.module.css';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import TopBar from './containers/TopBar';
import InitiativeList from './containers/InitiativeList';
import InitiativeModal from './containers/InitiativeModal';

import parchmentBackground from './assets/parchment.jpg';

import { CombatantProvider } from './contextProviders/combatant';
import { CombatProvider } from './contextProviders/combat';

function App() {
  // const [combatState, setCombatState] = useState({
  //   round: -1, // Round -1 = out of combat, round 0=rolling initiative, round 1 and up = proper rounds
  //   turn: 0,
  //   activeCharacterId: null, // null until round 1 begins
  // });

  // const handleCombatStart = () => {
  //   setCombatants(combatants.map(character => {
  //     const diceRoll = rollDice(6).total;
  //     return {
  //       ...character,
  //       initiativeRoll: diceRoll,
  //       initiativeTotal: diceRoll + character.initiativeRating
  //     }
  //   }));
  //   setCombatState({ ...combatState, round: 0 }); // Set round to rolling initiative
  // };
  // const handleCombatStop = () => {
  //   setCombatState({ ...combatState, round: -1, activeCharacterId: null, turn: 0 });
  // }

  // const advanceTurn = (byTurns) => {
  //   if (combatState.round < 1) return;
  //   if (combatState.turn + byTurns === 0 && combatState.round === 1) return; // Do nothing if it would go to turn 0 in round 1
  //   const resultTurn = combatState.turn + byTurns > combatants.length ? 1 : combatState.turn + byTurns === 0 ? combatants.length : combatState.turn + byTurns;
  //   const resultRound = combatState.turn + byTurns === 0 ? combatState.round - 1 : combatState.turn + byTurns > combatants.length ? combatState.round + 1 : combatState.round;
  //   const resultActiveCharacterId = combatants[resultTurn - 1].id;
  //   setCombatState({
  //     round: resultRound,
  //     turn: resultTurn,
  //     activeCharacterId: resultActiveCharacterId
  //   });
  // }

  // const initiativeModalClose = (e, reason) => {
  //   if (reason === 'escapeKeyDown' || reason === "cancelButtonClick" || reason === "backDropClick") {
  //     setCombatState({ ...combatState, round: -1 });
  //   } else {
  //     const sortedCharacters = arraySort([...combatants], ['initiativeTotal', 'initiativeRating', 'luckBonus'], { reverse: true })
  //     setCombatants(sortedCharacters);
  //     setCombatState({ ...combatState, round: combatState.round === 0 ? 1 : combatState.round, turn: 1, activeCharacterId: sortedCharacters[0].id });
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.ctrlKey && e.shiftKey && e.key === ' ') return handleCombatStop();
  //   if (e.ctrlKey && e.key === " ") combatState.round < 0 ? handleCombatStart() : advanceTurn(1);
  //   if (e.ctrlKey && e.key === 'Backspace') advanceTurn(-1);
  // };

  return (
    // onKeyDown={handleKeyPress}
    <Box tabIndex="0" className={classes.App} style={{ backgroundImage: `url(${parchmentBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
      <CombatProvider>        
        <CombatantProvider>
          <TopBar />
          <Box style={{ overflowY: 'auto' }}>
              <Container className={classes.InitiativeContainer}>
                <InitiativeList />
              </Container>
              <InitiativeModal />
          </Box>      
        </CombatantProvider>
      </CombatProvider>
    </Box>
  );
}

export default App;
