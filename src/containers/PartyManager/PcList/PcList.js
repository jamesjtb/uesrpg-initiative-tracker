import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import PcActions from '../PcActions/PcActions';

import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

const PcList = ({ pcs }) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Player</StyledTableCell>
                    <StyledTableCell align="left">Character Name</StyledTableCell>
                    <StyledTableCell align="center">XP</StyledTableCell>
                    <StyledTableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {pcs.map(pc => (
                    <TableRow key={pc._id}>
                        <StyledTableCell align="center">
                            <Typography component="span">{pc.playerName}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            <Typography component="span">{pc.characterName}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography component="span">{pc.xpAmount || 0}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <PcActions pc={pc} />
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PcList;