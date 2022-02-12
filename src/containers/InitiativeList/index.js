import React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { useTheme, styled } from '@mui/material/styles';

import CombatantListing from './CombatantListing';
import NewCombatant from '../NewCombatant';

import classes from './InitiativeList.module.css';

const InitiativeContainer = styled(TableContainer)(({theme}) => ({
  paddingBottom: theme.spacing(4)
}));

const InitiativeList = ({ combatants, newCombatants, combatState, onNewCombatantChange }) => {
  const theme = useTheme();
  const tableCellStyle = {
    color: theme.palette.secondary.contrastText
  };
  const activeCharacter = combatants.find(combatant => combatant.id === combatState.activeCharacterId)
  return (
    <>
      <InitiativeContainer>
        <Typography variant="h4" color="primary">
          {
            combatState.round === -1 ?
              "Out of Combat" :
              combatState.round === 0 ?
                "Rolling Initiative" :
                `Round ${combatState.round}, Turn ${combatState.turn} - ${activeCharacter.name}`
          }
        </Typography>
        <Table className={classes.InitiativeTable} size="small">
          <TableHead sx={{ bgcolor: theme.palette.secondary.main }}>
            <TableRow>
              <TableCell sx={tableCellStyle} align="center">Name</TableCell>
              <TableCell sx={tableCellStyle} align="center">Hit Points</TableCell>
              <TableCell sx={tableCellStyle} align="center">Action Points</TableCell>
              <TableCell sx={tableCellStyle} align="center">IR</TableCell>
              <TableCell sx={tableCellStyle} align="center">Luck Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combatants.map((combatant) => (
              <CombatantListing key={combatant.id} combatant={combatant} combatState={combatState} />
            ))}
          </TableBody>
        </Table>
      </InitiativeContainer>
      {newCombatants.map(newCombatant => (
        <NewCombatant key={newCombatant.id} newCombatant={newCombatant} onNewCombatantChange={onNewCombatantChange} />
      ))}
    </>
  );
};

export default InitiativeList;