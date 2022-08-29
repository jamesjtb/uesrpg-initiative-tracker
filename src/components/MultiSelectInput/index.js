import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

const MultiSelectInput = ({ name, value, onChange, options }) => {
    const handleSelect = e => {
        onChange(e.target.value);
    }
    return (
        <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">{name}</Typography>
            <Select
                value={value}
                variant="standard"
                onChange={handleSelect}
            >
                {options.map(option => (
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    )
};

export default MultiSelectInput;