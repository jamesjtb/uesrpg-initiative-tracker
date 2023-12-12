import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

const EncounterList = ({ encounters }) => (
    <Table size="small">
        <TableHead>
            <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Tags</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {encounters.map(encounter => (
                <TableRow key={encounter._id}>
                    <StyledTableCell align="center">
                        <Typography component="span">{encounter.name}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Typography component="span">{encounter.tags.join(', ')}</Typography>
                    </StyledTableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default EncounterList;
