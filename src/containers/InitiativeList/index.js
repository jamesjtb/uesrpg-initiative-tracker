import React from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import CharacterListing from './CharacterListing';

const InitiativeList = ({characters}) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>AP</TableCell>
            <TableCell>IR</TableCell>
            <TableCell>LB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character) => (
            <CharacterListing  key={character.id} character={character} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InitiativeList;