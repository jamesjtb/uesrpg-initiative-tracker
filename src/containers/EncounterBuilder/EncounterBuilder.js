import React from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const EncounterBuilder = () => {
    return (
        <Container sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" justifyContent="center">
                <Typography variant="h4" color="primary">
                    Encounter Builder
                </Typography>
                <Box sx={{ mb: 2, width: '100%' }}>
                    
                </Box>
            </Stack>
        </Container>
    );
};

export default EncounterBuilder;
