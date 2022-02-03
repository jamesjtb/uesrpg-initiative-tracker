import React, { useState } from 'react';

import classes from './App.module.css';

import Container from '@material-ui/core/Container';

import TopBar from './containers/TopBar';
import InitiativeList from './containers/InitiativeList';

function App() {
  const [ characters, setCharacters ] = useState([{id: 0, name:'James', hitPoints:14, actionPoints:3, initiativeRating:5, luckBonus:4, editing: false}]);

  const addCharacter = ({type}) => {
    setCharacters([...characters, {type: type, editing: true, id: characters.length }]);
  }

  return (
    <div className={classes.App}>
      <TopBar addCharacter={addCharacter} />
      <Container className={classes.InitiativeContainer}>
        <InitiativeList characters={characters} />
      </Container>
    </div>
  );
}

export default App;
