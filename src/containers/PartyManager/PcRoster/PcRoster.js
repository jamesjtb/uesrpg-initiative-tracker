import React, { useEffect, useState, useCallback } from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Add from '@mui/icons-material/Add';

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

const PcRoster = () => {
    const [pcs, setPcs] = useState([]);

    const getPcRoster = useCallback(async () => {
        const pcsResult = await window.playerCharacters.getAll();
        setPcs(pcsResult);
    }, [setPcs]);

    useEffect(() => {
        getPcRoster();
    }, [getPcRoster]);

    window.playerCharacters.onUpdate(() => {
        getPcRoster();
    });

    return (
        <>
            <Divider sx={{ mb: 1 }}>
                <Typography variant="h5" color="primary">
                    Player Character Roster
                </Typography>
            </Divider>
            <Box>
                <Grid container>
                    <Grid xs={8} />
                    <Grid xs={4} textAlign="right">
                        <Tooltip title="Add New Player Character">
                            <IconButton
                                onClick={() =>
                                    window.open(
                                        '/views/pceditor',
                                        '_blank',
                                        'top=0,left=0,height=395,width=675,frame=false,resizable=false,'
                                    )
                                }
                                size="large"
                            >
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Player</StyledTableCell>
                                <StyledTableCell align="left">Character Name</StyledTableCell>
                                <StyledTableCell align="center">XP</StyledTableCell>
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
                                        <Typography component="span">{pc.xpAmount}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Box>
        </>
    );
};

export default PcRoster;
