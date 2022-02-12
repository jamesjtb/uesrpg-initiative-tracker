import React, { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useTheme } from '@mui/material/styles';

import classes from './CharacterListing.module.css';
import Typography from '@mui/material/Typography';

const CharacterListing = ({ character, editCharacter, combatState }) => {
  const [characterEdit, setCharacterEdit] = useState({ ...character });

  const keyPress = e => {
    if (e.keyCode === 13) {
      editCharacter(characterEdit);
    }
  };

  const theme = useTheme();

  const activePlayerStyle = { backgroundColor: theme.palette.primary.main + '4D' };

  return (
      <TableRow style={combatState.activeCharacterId === character.id ? activePlayerStyle : null}>
        <TableCell align="center"><Typography component="span">{character.name}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}>
          <Typography component="span">
            {character.currentHitPoints} / {character.maxHitPoints}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.interactable}>
          <Typography component="span">
            {character.currentActionPoints} / {character.maxActionPoints}
          </Typography>
        </TableCell>
        <TableCell align="center"><Typography component="span">{character.initiativeRating}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}><Typography component="span">{character.luckBonus}</Typography></TableCell>
      </TableRow>
  )
};

export default CharacterListing;