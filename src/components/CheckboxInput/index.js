import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const CheckboxInput = ({ name, value, onChange }) => {
    const handleCheck = e => {
        onChange(e.target.checked);
    }
    return (
        <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">{name}</Typography>
            <Checkbox
                checked={value}
                onChange={handleCheck}
            />
        </Stack>
    )
};

export default CheckboxInput;