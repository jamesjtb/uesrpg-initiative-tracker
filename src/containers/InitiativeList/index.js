import React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import CharacterListing from './CharacterListing';

import classes from './InitiativeList.module.css';

const InitiativeList = ({characters, editCharacter, combatState}) => {  
  const theme = useTheme();
  const tableCellStyle = {
    color: theme.palette.secondary.contrastText
  };
  const activeCharacter = characters.find(character => character.id === combatState.activeCharacterId)
  return (
    <TableContainer>
      <Typography variant="h4" color="primary">
        {
          combatState.round === -1 ?
            "Out of Combat" :
            combatState.round === 0 ?
              "Rolling Initiative" :
              `Round ${combatState.round} Turn ${combatState.turn} - ${activeCharacter.name}`
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
          {characters.map((character) => (
            <CharacterListing key={character.id} character={character} editCharacter={editCharacter} combatState={combatState} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InitiativeList;