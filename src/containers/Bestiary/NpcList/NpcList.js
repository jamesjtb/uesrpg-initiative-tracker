import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

import NpcActions from '../NpcActions/NpcActions';

const NpcList = ({ npcs }) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Type</StyledTableCell>
                    <StyledTableCell align="center">Threat Rating</StyledTableCell>
                    <StyledTableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {npcs.map(npc => (
                    <TableRow key={npc._id}>
                        <StyledTableCell align="center">
                            <Typography component="span">{npc.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography component="span">{npc.race}, {npc.type}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography component="span">{npc.threatRating}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <NpcActions npc={npc} />
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default NpcList;
