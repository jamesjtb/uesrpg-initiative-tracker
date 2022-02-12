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

const NewCombatantContainer = styled(Paper)(({ theme }) => ({
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

const NewCombatant = ({newCombatant, onNewCombatantChange}) => {
  const keyPress = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') onNewCombatantChange(newCombatant, 'submit');
  }
  return (
    <Box component={NewCombatantContainer} onKeyPress={keyPress}>
      <Stack direction="row">
        <CharacterInputField
          id="newCombatant.name"
          label="Name"
          variant="standard"
          value={newCombatant.name}
          onChange={e => onNewCombatantChange({ ...newCombatant, name: e.target.value }, 'edit')}
        />
        <CharacterInputField
          id="newCombatant.maxHitPoints"
          label="HP"
          variant="standard"
          type="number"
          value={newCombatant.maxHitPoints}
          onChange={e => onNewCombatantChange(
            { ...newCombatant, maxHitPoints: e.target.value, currentHitPoints: e.target.value }, // Editing both max and current
            'edit'
          )}
        />
        <CharacterInputField
          id="newCombatant.actionPoints"
          label="AP"
          variant="standard"
          type="number"
          value={newCombatant.maxActionPoints}
          onChange={e => onNewCombatantChange(
            { ...newCombatant, maxActionPoints: e.target.value, currentActionPoints: e.target.value },
            'edit'
          )}
        />
        <CharacterInputField
          id="newCombatant.initiativeRating"
          label="IR"
          variant="standard"
          type="number"
          value={newCombatant.initiativeRating}
          onChange={e => onNewCombatantChange({ ...newCombatant, initiativeRating: e.target.value }, 'edit')}
        />
        <CharacterInputField
          id="newCombatant.luckBonus"
          label="LB"
          variant="standard"
          type="number"
          value={newCombatant.luckBonus}
          onChange={e => onNewCombatantChange(
            { ...newCombatant, luckBonus: e.target.value, currentLuckPoints: e.target.value },
            'edit'
          )}
        />
        <ButtonGroup>
          <Button onClick={() => onNewCombatantChange(newCombatant, 'delete')}><DeleteForever /></Button>
          <Button onClick={() => onNewCombatantChange(newCombatant, 'submit')}><Check /></Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
};

export default NewCombatant;