import React from 'react';

import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';

const InputPair = ({ rulePair, setRulePair, ruleType = 'standard' }) => {
    return (
        <ListItem disableGutters>
            <Grid container spacing={0}>
                <Grid xs={3}>
                    <TextField variant="standard" fullWidth />
                </Grid>
                <Grid xs={1}>
                    :
                </Grid>
                <Grid xs={8}><TextField variant="standard" fullWidth multiline /></Grid>
            </Grid>
        </ListItem>
    );
};

export default InputPair;
