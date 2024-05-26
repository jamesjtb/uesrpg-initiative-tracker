import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import EncounterBuilder from './EncounterBuilder/EncounterBuilder';
import EncounterList from './EncounterList/EncounterList';
import { Typography } from '@mui/material';

const Encounters = () => {
    const [encounters, setEncounters] = useState([]);

    return (
        <Container sx={{ flexGrow: 1 }}>
            <Typography variant="h4" color="primary">
                Encounters
            </Typography>
            <Stack alignItems="center" justifyContent="center">
                <EncounterBuilder encounters={encounters} />
                <EncounterList />
            </Stack>
        </Container>
    );
};

export default Encounters;
