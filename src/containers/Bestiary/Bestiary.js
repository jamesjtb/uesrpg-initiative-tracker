import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import Add from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import { openChildWindow } from '../../util/utils';
import { StyledTableCell } from '../../components/StyledComponents/TableCell';

const Bestiary = () => {
    return (
        <Container sx={{ flexGrow: 1 }}>
            <Typography sx={{ mb: 2 }} variant="h4" color="primary">
                Bestiary
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Grid container>
                    <Grid xs={6} textAlign="left">
                        <TextField label="Search" variant="standard" />
                    </Grid>
                    <Grid xs={6} textAlign="right">
                        <Tooltip title="Add New NPC">
                            <IconButton
                                onClick={() =>
                                    openChildWindow('/views/npceditor', {
                                        modal: true,
                                    })
                                }
                            >
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography component="span">Test</Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyledTableCell>
                            <Typography component="span">Test</Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Container>
    );
};

export default Bestiary;
