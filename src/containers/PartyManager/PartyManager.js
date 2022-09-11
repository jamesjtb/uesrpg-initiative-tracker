import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import PcRoster from './PcRoster/PcRoster';


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
            <PcRoster />
        </Container>
    );
};

export default Party;
