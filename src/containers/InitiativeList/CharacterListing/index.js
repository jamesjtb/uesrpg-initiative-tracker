import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

const CharacterListing = ({character}) => {
  return (
    character.editing ? 
      <TableRow>
        <TableCell><TextField id="character-name" variant="standard" size="small"/></TableCell>
        <TableCell><TextField id="character-hitPoints" variant="standard" size="small"/></TableCell>
        <TableCell><TextField id="character-actionPoints" variant="standard" size="small"/></TableCell>
        <TableCell><TextField id="character-initiativeRating" variant="standard" size="small"/></TableCell>
        <TableCell><TextField id="character-luckBonus" variant="standard" size="small"/></TableCell>
      </TableRow> :
      <TableRow>
        <TableCell>{character.name}</TableCell>
        <TableCell>{character.hitPoints}</TableCell>
        <TableCell>{character.actionPoints}</TableCell>
        <TableCell>{character.initiativeRating}</TableCell>
        <TableCell>{character.luckBonus}</TableCell>
      </TableRow>
  )
};

export default CharacterListing;