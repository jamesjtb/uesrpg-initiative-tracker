import React, { useContext, useEffect } from 'react';

import arraySort from 'array-sort';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { rollDice } from '../../util/utils';

import { CombatContext } from '../../contextProviders/combat';

const InitiativeModal = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const {
    combatState,
    startCombat,
    stopCombat,
    setCombatants,
    editCombatant
  } = useContext(CombatContext);

  useEffect(() => {
    if (combatState.round === 0) {
      setCombatants(combatState.combatants.map(combatant => {
        const diceRoll = rollDice(6).total;
        return {
          ...combatant,
          initiativeTotal: diceRoll + combatant.initiativeRating
        }
      }));
    }
  }, [ combatState.round ]);

  const onClose = (e, reason) => {
    if (reason === 'escapeKeyDown' || reason === "cancelButtonClick" || reason === "backDropClick") {
      stopCombat();
      return;
    }
    if (reason === 'submitButtonClick') {
      const sortedCharacters = arraySort([...combatState.combatants], ['initiativeTotal', 'initiativeRating', 'luckBonus'], { reverse: true })
      setCombatants(sortedCharacters);
      startCombat({ startingCharacterId: sortedCharacters[0].id });
      return;
    }
  };

  return (
    <Modal
      open={combatState.round === 0}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography variant="h4" color="primary">Initiative Rolls</Typography>
        <Typography variant="subtitle2">1d6 + Initiative Rating</Typography>
        <Divider />
        {
          combatState.combatants.map(combatant => (
            <TextField
              style={{ margin: "10px" }}
              inputProps={{ style: { textAlign: 'center' } }}
              key={combatant.id}
              id={`${combatant.id}`}
              variant="standard"
              label={combatant.name}
              type="number"
              InputLabelProps={{ shrink: true }}
              value={combatant.initiativeTotal}
              onChange={e => editCombatant({ ...combatant, initiativeTotal: parseInt(e.target.value) })}
            />
          ))
        }
        <Grid container justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={e => onClose(e, 'cancelButtonClick')}>Cancel</Button>
          <Button variant="contained" color="success" onClick={e => onClose(e, 'submitButtonClick')}>Submit Rolls</Button>
        </Grid>
      </Box>
    </Modal>
  )
};

export default InitiativeModal;