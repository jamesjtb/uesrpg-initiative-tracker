import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Save from '@mui/icons-material/Save';
import Folder from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';

import AppMenuItem from './AppMenuItem/AppMenuItem';

import { Skull, Cycle } from '../../components/rpg-awesome/rpg-icons';
import { Anvil, CrossedSwords } from '../../components/rpg-awesome/weapons-and-armor';
import { Gears } from '../../components/rpg-awesome/electronics';
import { DoubleTeam } from '../../components/rpg-awesome/players';

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
                <AppMenuItem appMenuOpen={open} onClick={loadFile} displayText="Load from File">
                    <Folder />
                </AppMenuItem>
                <AppMenuItem
                    appMenuOpen={open}
                    onClick={() => saveToFile(combatantTypes.PC)}
                    displayText="Save Party To File"
                >
                    <Save />
                </AppMenuItem>
                <AppMenuItem
                    appMenuOpen={open}
                    onClick={() => saveToFile(combatantTypes.NPC)}
                    displayText="Save Encounter To File"
                >
                    <Save />
                </AppMenuItem>
                <Divider />
                <NavLink to="/">
                    <AppMenuItem appMenuOpen={open} displayText="Initiative">
                        <CrossedSwords />
                    </AppMenuItem>
                </NavLink>
                <NavLink to="/encounter-builder">
                    <AppMenuItem appMenuOpen={open} displayText="Encounter Builder">
                        <Anvil />
                    </AppMenuItem>
                </NavLink>
                <NavLink to="/party">
                    <AppMenuItem appMenuOpen={open} displayText="Party">
                        <DoubleTeam />
                    </AppMenuItem>
                </NavLink>
                <NavLink to="/bestiary">
                    <AppMenuItem appMenuOpen={open} displayText="Bestiary">
                        <Skull />
                    </AppMenuItem>
                </NavLink>
                <Divider />
                <AppMenuItem
                    appMenuOpen={open}
                    onClick={onTriggerUpdate}
                    displayText="Check for Updates"
                >
                    <Cycle />
                </AppMenuItem>
                <Divider />
                <AppMenuItem
                    appMenuOpen={open}
                    onClick={() => setSettingsModalOpen(true)}
                    displayText="Settings"
                >
                    <Gears />
                </AppMenuItem>
                <Divider />
            </List>
        </Drawer>
    );
};

export default AppDrawer;
