import React, { useState } from 'react';

import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';

import { useTheme } from '@mui/material/styles';

export const ConditionTag = ({index, removeCondition, condition }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        margin: '.2em',
        padding: '3px',
        border: '1px solid black',
        borderRadius: '.5em',
        backgroundColor: theme.palette.background.default
      }}
    >
      {condition}
      <IconButton size="small" sx={{padding: '1px'}} onClick={() => removeCondition(index)}><Clear fontSize="small" /></IconButton>
    </Box>
  );
};

export const ConditionInputPopover = ({ anchorEl, onClose, anchorOrigin }) => {
  const theme = useTheme();
  const [ conditionValue, setConditionValue ] = useState('');

  const handleClose = value => {
    setConditionValue('');
    onClose(value);
  };

  const keyPress = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleClose(conditionValue);
    } else if ((e.code === 'Enter' || e.code === 'NumpadEnter') && conditionValue === '') {
      handleClose(null);
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      PaperProps={{ style: { padding: theme.spacing(1) } }}
      anchorEl={anchorEl}
      onClose={() => handleClose(null)}
      anchorOrigin={anchorOrigin}
      onKeyPress={keyPress}
    >
      <TextField
        variant="standard"
        type="text"
        label="Condition Name"
        value={conditionValue}
        onChange={e => setConditionValue(e.target.value)}
        autoFocus
      />
      <IconButton color="error" onClick={() => handleClose(null)}><Clear color="error" /></IconButton>
      <IconButton color="success" onClick={() => handleClose(conditionValue)}><Check color="success" /></IconButton>
    </Popover>
  )
};