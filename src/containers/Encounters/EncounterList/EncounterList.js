import React, { useContext, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';
import { EncounterContext } from '../../../contextProviders/encounter';

const EncounterList = () => {
    const { encounterState } = useContext(EncounterContext);
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Label Color</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {encounterState?.combatants?.map(combatant => (
                    <TableRow key={combatant.id}>
                        <StyledTableCell align="center">
                            <Typography component="span">{combatant.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography component="span">something</Typography>
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EncounterList;
