import React, { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useTheme } from '@mui/material/styles';

import classes from './CombatantListing.module.css';
import Typography from '@mui/material/Typography';

const CombatantListing = ({ combatant, combatState }) => {

  const theme = useTheme();

  const activePlayerStyle = { backgroundColor: theme.palette.primary.main + '4D' };

  return (
      <TableRow style={combatState.activeCharacterId === combatant.id ? activePlayerStyle : null}>
        <TableCell align="center"><Typography component="span">{combatant.name}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}>
          <Typography component="span">
            {combatant.currentHitPoints} / {combatant.maxHitPoints}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.interactable}>
          <Typography component="span">
            {combatant.currentActionPoints} / {combatant.maxActionPoints}
          </Typography>
        </TableCell>
        <TableCell align="center"><Typography component="span">{combatant.initiativeRating}</Typography></TableCell>
        <TableCell align="center" className={classes.interactable}><Typography component="span">{combatant.luckBonus}</Typography></TableCell>
      </TableRow>
  )
};

export default CombatantListing;