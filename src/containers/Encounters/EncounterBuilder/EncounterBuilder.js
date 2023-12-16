import React, { useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';
import { EncounterContext } from '../../../contextProviders/encounter';
import CombatantActions from './CombatantActions';

const EncounterBuilder = () => {
    const { encounterState } = useContext(EncounterContext);
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="right">Label Color</StyledTableCell>
                    <StyledTableCell align="right" />
                </TableRow>
            </TableHead>
            <TableBody>
                {encounterState?.combatants?.map(combatant => (
                    <TableRow key={combatant.id}>
                        <StyledTableCell align="left">
                            <Typography component="span">{combatant.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography component="span">something</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right"><CombatantActions combatant={combatant} /></StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EncounterBuilder;
