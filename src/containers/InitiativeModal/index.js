import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const InitiativeModal = ({ open, onClose, characters, editCharacter }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '410px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        {
          characters.map(character => (
            <TextField
              style={{ margin: "10px" }}
              inputProps={{ style: { textAlign: 'center' } }}
              key={character.id}
              id={`${character.id}`}
              variant="standard"
              label={character.name}
              type="number"
              InputLabelProps={{ shrink: true }}
              value={character.initiativeRoll}
              onChange={e => editCharacter({ ...character, initiativeRoll: parseInt(e.target.value) || 0, initiativeTotal: parseInt(e.target.value) || 0 + character.initiativeRating })}
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