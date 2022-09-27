import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Add from '@mui/icons-material/Add';

const NpcVariantMenu = () => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    return (
        <>
            <Button
                size="small"
                endIcon={<KeyboardArrowDownIcon size="inherit" />}
                onClick={e => setAnchor(e.currentTarget)}
            >
                VARIANTS (NONE)
            </Button>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(null)}
            >   
                <Divider />
                <MenuItem>Add New Variant <Add /></MenuItem>
            </Menu>
        </>
    );
};

export default NpcVariantMenu;
