import React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import CharacterListing from './CharacterListing';

const InitiativeList = ({characters, submitCharacter}) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">HP</TableCell>
            <TableCell align="center">AP</TableCell>
            <TableCell align="center">IR</TableCell>
            <TableCell align="center">LB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character) => (
            <CharacterListing key={character.id} character={character} submitCharacter={submitCharacter}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InitiativeList;