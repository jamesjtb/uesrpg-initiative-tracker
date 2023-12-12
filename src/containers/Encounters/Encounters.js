import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Add from '@mui/icons-material/Add';

import EncounterList from './EncounterList/EncounterList';
import { openChildWindow } from '../../util/utils';

const Encounters = () => {
    const [encounters, setEncounters] = useState([]);

    return (
        <Container sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" justifyContent="center">
                <Typography variant="h4" color="primary">
                    Encounter Builder
                </Typography>
                <Box sx={{ mb: 2, width: '100%' }}>
                <Grid container>
                        <Grid xs={10} textAlign="left" sx={{ '& > :not(style)': { mr: 1, ml: 1 } }}>
                        </Grid>
                        <Grid xs={2} textAlign="right">
                            <Tooltip title="Add New NPC">
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        openChildWindow('views/encounterbuilder', {
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
                <EncounterList encounters={encounters} />
            </Stack>
        </Container>
    );
};

export default Encounters;
