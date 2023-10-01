import React from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

import AppMenuItem from './AppMenuItem/AppMenuItem';

import { Skull, Cycle } from '../../components/rpg-awesome/rpg-icons';
import { Anvil, CrossedSwords } from '../../components/rpg-awesome/weapons-and-armor';
import { Gears } from '../../components/rpg-awesome/electronics';
import { DoubleTeam } from '../../components/rpg-awesome/players';

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

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton color="inherit" onClick={toggle}>
                    <MenuIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
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
