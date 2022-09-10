import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';

import Add from '@mui/icons-material/Add';

const Party = () => {
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
            <Box sx={{ height: '30vh' }}></Box>
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
                                        'top=0,left=0,height=325,width=675,frame=false,resizable=false,'
                                    )
                                }
                                size="large"
                            >
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Party;
