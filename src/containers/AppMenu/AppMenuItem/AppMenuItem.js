import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';

const AppMenuItem = ({ appMenuOpen, displayText, children, onClick }) => {
    return (
        <ListItem disablePadding sx={{ display: 'block' }} onClick={onClick}>
            <Tooltip
                title={displayText}
                enterDelay={700}
                enterNextDelay={700}
                leaveDelay={200}
                disableInteractive
                disableHoverListener={appMenuOpen}
            >
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: appMenuOpen ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: appMenuOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {children}
                    </ListItemIcon>
                    <ListItemText primary={displayText} sx={{ opacity: appMenuOpen ? 1 : 0 }} />
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export default AppMenuItem;
