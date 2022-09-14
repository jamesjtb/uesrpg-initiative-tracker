import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import PcActions from '../PcActions/PcActions';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        padding: `${theme.spacing(0.5)}`,
    },
    [`&.${tableCellClasses.body}`]: {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        borderTop: `2px solid ${theme.palette.secondary.main}`,
        padding: `0 ${theme.spacing(0.5)}`,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
}));

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