import React, { useContext, useEffect } from 'react';

import arraySort from 'array-sort';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
          initiativeRoll: diceRoll,
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
              value={combatant.initiativeRoll}
              onChange={e => editCombatant({ ...combatant, initiativeRoll: parseInt(e.target.value) || 0, initiativeTotal: parseInt(e.target.value) || 0 + combatant.initiativeRating })}
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