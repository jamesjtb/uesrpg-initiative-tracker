import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import Check from '@mui/icons-material/Check';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Add from '@mui/icons-material/Add';

import {styled} from '@mui/material/styles';

const NewCharacterContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  textAlign: 'center'
}));

const CharacterInputField = styled(TextField)(({theme}) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  textAlign: 'center'
}));

const NewCharacter = ({newCharacter, onNewCharacterChange}) => {
  const keyPress = e => {
    console.log(e)
    if (e.code === 'Enter' || e.code === 'NumpadEnter') onNewCharacterChange(newCharacter, 'submit');
  }
  return (
    <Box component={NewCharacterContainer} onKeyPress={keyPress}>
      <Stack direction="row">
        <CharacterInputField
          id="newCharacter.name"
          label="Name"
          variant="standard"
          value={newCharacter.name}
          onChange={e => onNewCharacterChange({ ...newCharacter, name: e.target.value }, 'edit')}
        />
        <CharacterInputField
          id="newCharacter.maxHitPoints"
          label="HP"
          variant="standard"
          type="number"
          value={newCharacter.maxHitPoints}
          onChange={e => onNewCharacterChange(
            { ...newCharacter, maxHitPoints: e.target.value, currentHitPoints: e.target.value }, // Editing both max and current
            'edit'
          )}
        />
        <CharacterInputField
          id="newCharacter.actionPoints"
          label="AP"
          variant="standard"
          type="number"
          value={newCharacter.maxActionPoints}
          onChange={e => onNewCharacterChange(
            { ...newCharacter, maxActionPoints: e.target.value, currentActionPoints: e.target.value },
            'edit'
          )}
        />
        <CharacterInputField
          id="newCharacter.initiativeRating"
          label="IR"
          variant="standard"
          type="number"
          value={newCharacter.initiativeRating}
          onChange={e => onNewCharacterChange({ ...newCharacter, initiativeRating: e.target.value }, 'edit')}
        />
        <CharacterInputField
          id="newCharacter.luckBonus"
          label="LB"
          variant="standard"
          type="number"
          value={newCharacter.luckBonus}
          onChange={e => onNewCharacterChange(
            { ...newCharacter, luckBonus: e.target.value, currentLuckPoints: e.target.value },
            'edit'
          )}
        />
        <ButtonGroup>
          <Button onClick={() => onNewCharacterChange(newCharacter, 'delete')}><DeleteForever /></Button>
          <Button onClick={() => onNewCharacterChange(newCharacter, 'submit')}><Check /></Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
};

export default NewCharacter;