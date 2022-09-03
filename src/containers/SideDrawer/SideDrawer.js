import React, { useContext } from 'react';

import { styled } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Save from '@mui/icons-material/Save';
import Folder from '@mui/icons-material/Folder';
import Settings from '@mui/icons-material/Settings';
import Replay from '@mui/icons-material/Replay';
import MenuIcon from '@mui/icons-material/Menu';

import { CombatContext } from '../../contextProviders/combat';
import { combatantTypes } from '../../contextProviders/combat/values';

export const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1.5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

const AppDrawer = ({ open, toggle, setSettingsModalOpen, onTriggerUpdate }) => {
    const { combatState, setCombatants } = useContext(CombatContext);

    const saveToFile = async type => {
        await window.fs.saveCombatants(
            type,
            combatState.combatants.filter(c => c.type === type)
        );
    };

    const loadFile = async () => {
        const result = await window.fs.loadFile();
        if (result.type === 'error') throw new Error(`Error loading file: ${result.errorReason}`); // TODO: inform the user
        switch (result.type) {
            case '3e-party':
                // TODO: Inform the user that any currently tracked player combatants will be removed in loading the file
                setCombatants([
                    ...combatState.combatants.filter(c => c.type !== combatantTypes.PC),
                    ...result.data,
                ]);
                break;
            case '3e-encounter':
                // TODO: Inform the user that any currently tracked player combatants will be removed in loading the file
                setCombatants([
                    ...combatState.combatants.filter(c => c.type !== combatantTypes.NPC),
                    ...result.data,
                ]);
                break;
            default:
                throw new Error('Unknown data type returned from main process.'); // TODO: inform the user
        }
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton color="inherit" onClick={toggle}>
                    <MenuIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={loadFile}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Folder />
                        </ListItemIcon>
                        <ListItemText primary="Load from File" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => saveToFile(combatantTypes.PC)}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Save />
                        </ListItemIcon>
                        <ListItemText primary="Save Party to File" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => saveToFile(combatantTypes.NPC)}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Save />
                        </ListItemIcon>
                        <ListItemText primary="Save Encounter to File" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={onTriggerUpdate}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Replay />
                        </ListItemIcon>
                        <ListItemText primary="Check for Updates" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => setSettingsModalOpen(true)}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </List>
        </Drawer>
    );
};

export default AppDrawer;
