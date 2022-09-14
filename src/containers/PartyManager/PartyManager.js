import React, { useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Add from '@mui/icons-material/Add';

import PcList from './PcList/PcList';

import { openChildWindow } from '../../util/utils';

const Party = () => {
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
        <Container sx={{ flexGrow: 1 }}>
            <Typography sx={{ mb: 4 }} variant="h4" color="primary">
                Party Manager
            </Typography>
            <Divider sx={{ mb: 1 }}>
                <Typography variant="h5" color="primary">
                    Active Party Members
                </Typography>
            </Divider>
            <Box sx={{ height: '30vh' }}>
                <PcList pcs={pcs.filter(pc => pc.active === true)} />
            </Box>
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
                                    openChildWindow('/views/pceditor', { height: 395, width: 675, modal: true })
                                }
                                size="large"
                                color="primary"
                            >
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <PcList pcs={pcs.filter(pc => pc.active === false)} />
                </Grid>
            </Box>
        </Container>
    );
};

export default Party;
