import React, {useContext} from 'react';

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

import { CombatContext } from '../../contextProviders/combat';

import { combatantStatuses } from '../../contextProviders/combat/values';

const InitiativeContainer = styled(TableContainer)(({theme}) => ({
  paddingBottom: theme.spacing(4),
  userSelect: 'none'
}));

const InitiativeList = () => {

  const {
    combatState
  } = useContext(CombatContext);

  const theme = useTheme();
  const tableCellStyle = {
    color: theme.palette.secondary.contrastText,
    padding: `${theme.spacing(0.5)}`
  };
  const activeCombatant = combatState.combatants.find(combatant => combatant.id === combatState.activeCombatantId);
  return (
    <>
      <InitiativeContainer>
        <Typography variant="h4" color="primary">
          {
            combatState.round === -1 ?
              "Out of Combat" :
              combatState.round === 0 ?
                "Rolling Initiative" :
                `Round ${combatState.round}, Turn ${combatState.turn} - ${activeCombatant.name}`
          }
        </Typography>
        <Table className={classes.InitiativeTable} size="small">
          <TableHead sx={{ bgcolor: theme.palette.secondary.main }}>
            <TableRow>              
              <TableCell sx={tableCellStyle} align="center">Initiative</TableCell>
              <TableCell sx={tableCellStyle} align="right" />
              <TableCell sx={tableCellStyle} align="left">Name</TableCell>
              <TableCell sx={tableCellStyle} align="left">Conditions</TableCell>
              <TableCell sx={tableCellStyle} align="center">Hit Points</TableCell>
              <TableCell sx={tableCellStyle} align="center">Luck Points</TableCell>
              <TableCell sx={tableCellStyle} align="center">Magicka Points</TableCell>
              <TableCell sx={tableCellStyle} align="center">Stamina Points</TableCell>          
              <TableCell sx={tableCellStyle} align="center">Action Points</TableCell>
              <TableCell sx={tableCellStyle} align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {combatState.combatants.map((combatant) => (
              combatant.status !== combatantStatuses.CREATING ?
                <CombatantListing key={combatant.id} combatant={combatant} />
                : null
            ))}
          </TableBody>
        </Table>
      </InitiativeContainer>
      {combatState.combatants.map(combatant => (
        [ combatantStatuses.CREATING, combatantStatuses.EDITING ].includes(combatant.status) ? 
          <NewCombatant key={combatant.id} newCombatant={combatant} />
          : null
      ))}
    </>
  );
};

export default InitiativeList;