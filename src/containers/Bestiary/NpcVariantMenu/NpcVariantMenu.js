import React from 'react';

import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NpcVariantMenu = () => {
    return (
        <Button size="small" endIcon={<KeyboardArrowDownIcon size="inherit" />}>Variants </Button>
    );
};

export default NpcVariantMenu;