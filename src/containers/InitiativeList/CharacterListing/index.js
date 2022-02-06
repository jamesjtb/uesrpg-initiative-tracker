import React, { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';

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
    character.editing ?
      <TableRow>
        <TableCell align="center">
          <TextField id="character-name" size="small" value={characterEdit.name} variant="standard" inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setCharacterEdit({ ...characterEdit, name: e.target.value })} onKeyDown={keyPress} />
        </TableCell>

        <TableCell align="center">
          <TextField
            align="center"
            className={classes.halfInput}
            id="character-currentHitPoints"
            inputProps={{ style: { textAlign: 'center' } }}
            size="small"
            type="number"
            variant="standard"
            value={characterEdit.currentHitPoints}
            onChange={e => setCharacterEdit({ ...characterEdit, currentHitPoints: parseInt(e.target.value) || 0 })}
            onKeyDown={keyPress}
          /> <Typography component="span"> / </Typography>
          <TextField
            align="center"
            className={classes.halfInput}
            id="character-maxHitPoints"
            inputProps={{ style: { textAlign: 'center' } }}
            size="small"
            type="number"
            variant="standard"
            value={characterEdit.maxHitPoints}
            onChange={e => setCharacterEdit({ ...characterEdit, maxHitPoints: parseInt(e.target.value) || 0 })}
            onKeyDown={keyPress}
          />
        </TableCell>

        <TableCell align="center">
          <TextField id="character-actionPoints" size="small" type="number" value={characterEdit.actionPoints} variant="standard" inputProps={{ style: { textAlign: 'center' } }}
            onChange={e => setCharacterEdit({ ...characterEdit, actionPoints: parseInt(e.target.value) || 0 })} onKeyDown={keyPress} />
        </TableCell>

        <TableCell align="center">
          <TextField id="character-initiativeRating" size="small" type="number" value={characterEdit.initiativeRating} variant="standard" inputProps={{ style: { textAlign: 'center' } }}
            onChange={e => setCharacterEdit({ ...characterEdit, initiativeRating: parseInt(e.target.value) || 0 })} onKeyDown={keyPress} />
        </TableCell>

        <TableCell align="center">
          <TextField id="character-luckBonus" size="small" type="number" value={characterEdit.luckBonus} variant="standard" inputProps={{ style: { textAlign: 'center' } }}
            onChange={e => setCharacterEdit({ ...characterEdit, luckBonus: parseInt(e.target.value) || 0 })} onKeyDown={keyPress} />
        </TableCell>
      </TableRow> :
      <TableRow style={combatState.activeCharacterId === character.id ? activePlayerStyle : null}>
        <TableCell align="center"><Typography component="span">{character.name}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}>
          <Typography component="span">
            {character.currentHitPoints} / {character.maxHitPoints}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.interactable}><Typography component="span">{character.actionPoints}</Typography></TableCell>
        <TableCell align="center"><Typography component="span">{character.initiativeRating}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}><Typography component="span">{character.luckBonus}</Typography></TableCell>
      </TableRow>
  )
};

export default CharacterListing;