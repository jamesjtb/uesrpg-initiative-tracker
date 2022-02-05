import React, { useState } from 'react';

import classes from './App.module.css';

import Container from '@mui/material/Container';

import TopBar from './containers/TopBar';
import InitiativeList from './containers/InitiativeList';
import InitiativeModal from './containers/InitiativeModal';

import arraySort from 'array-sort';
import { rollDice } from './util/rpg-utils';

function App() {
  const [ characters, setCharacters ] = useState([]);
  const [ combatState, setCombatState] = useState({
    round: -1, // Round -1 = out of combat, round 0=rolling initiative, round 1 and up = proper rounds
    activeCharacterId: null, // null until round 1 begins
  });

  const submitCharacter = submittedCharacter => {
    setCharacters(characters.map(character => (
      character.id === submittedCharacter.id ?
      {...submittedCharacter, editing: false}
      : character)));
  }

  const addCharacter = ({type}) => {
    setCharacters([...characters, {
      id: characters.length,
      type: type,
      name: "",
      currentHitPoints: 0,
      maxHitPoints: 0,
      actionPoints: 3,
      initiativeRating: 0,
      luckBonus: 0,
      initiativeRoll: 0,
      editing: true
    }]);
  }

  const handleCombatStart = () => {
    setCharacters(characters.map(character => {
      const diceRoll = rollDice(6).total;
      return {
        ...character,
        initiativeRoll: diceRoll,
        initiativeTotal: diceRoll + character.initiativeRating
      }
    }));
    setCombatState({...combatState, round: 0}); // Set round to rolling initiative
  };

  const initiativeModalClose = (e, reason) => {
    if (reason === 'escapeKeyDown' || reason === "cancelButtonClick") {
      setCombatState({...combatState, round: -1});
    } else {
      setCharacters(arraySort([...characters], ['initiativeTotal', 'initiativeRating', 'luckBonus'], {reverse: true}))
      setCombatState({...combatState, round: combatState.round === 0 ? 1 : combatState.round});
    }
  };

  return (
    <div className={classes.App}>
      <TopBar round={combatState.round} addCharacter={addCharacter} handleCombatStart={handleCombatStart} />
      <Container className={classes.InitiativeContainer}>
        <InitiativeList characters={characters} submitCharacter={submitCharacter} />
      </Container>
      <InitiativeModal open={combatState.round === 0} onClose={initiativeModalClose} characters={characters} submitCharacter={submitCharacter} />
    </div>
  );
}

export default App;
