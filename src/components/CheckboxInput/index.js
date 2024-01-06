import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const CheckboxInput = ({ name, value, onChange }) => {
    const handleCheck = e => {
        onChange(e.target.checked);
    };
    return (
        <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row" spacing={2}>
            <Checkbox checked={value} onChange={handleCheck} />
            <Typography variant="subtitle1">{name}</Typography>
        </Stack>
    );
};

export default CheckboxInput;
