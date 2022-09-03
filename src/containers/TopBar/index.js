import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Add from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrow from '@mui/icons-material/PlayArrow';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Stop from '@mui/icons-material/Stop';

import { CombatContext } from '../../contextProviders/combat';

import { combatantTypes } from '../../contextProviders/combat/values';

const settingsIpc = window.settings;
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const TopBar = ({ toggleSideDrawer, isSideDrawerOpen }) => {
    const { combatState, initiateCombat, stopCombat, advanceTurn, addCombatant } =
        useContext(CombatContext);

    /****************** */
    const [addMenuAnchor, setAddMenuAnchor] = useState(null);
    const [combatSettings, setCombatSettings] = useState(null);
    const isAddMenuOpen = Boolean(addMenuAnchor);

    settingsIpc.onUpdate(() => {
        (async () => {
            const newCombatSettings = await settingsIpc.get('combat');
            setCombatSettings({ ...newCombatSettings });
        })();
    });

    useEffect(() => {
        (async () => {
            const newCombatSettings = await settingsIpc.get('combat');
            setCombatSettings({ ...newCombatSettings });
        })();
    }, []);

    const handleAddMenuOpen = event => {
        setAddMenuAnchor(event.currentTarget);
    };

    const handleAddMenuClose = () => {
        setAddMenuAnchor(null);
    };

    const handleAddMenuClick = type => {
        addCombatant(type);
        handleAddMenuClose();
    };

    /*********** */

    const addMenu = (
        <Menu
            anchorEl={addMenuAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="add-character-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isAddMenuOpen}
            onClose={handleAddMenuClose}
        >
            <MenuItem onClick={() => handleAddMenuClick(combatantTypes.PC)}>
                Add Player Character
            </MenuItem>
            <MenuItem onClick={() => handleAddMenuClick(combatantTypes.NPC)}>
                Add Non-Player Character
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar position="fixed" open={isSideDrawerOpen}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box>
                        <IconButton
                            onClick={toggleSideDrawer}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            color="inherit"
                            disabled={
                                combatState.round < 1 ||
                                (combatState.round === 1 && combatState.turn === 1)
                            }
                            onClick={() =>
                                advanceTurn({ byTurns: -1, combatants: combatState.combatants })
                            }
                        >
                            <SkipPrevious />
                        </IconButton>
                        {combatState.round > 0 ? (
                            <IconButton color="inherit" onClick={stopCombat}>
                                <Stop />
                            </IconButton>
                        ) : combatState.round === 0 ? (
                            <IconButton disabled>
                                <CircularProgress color="secondary" />
                            </IconButton>
                        ) : (
                            <IconButton color="inherit" onClick={initiateCombat}>
                                <PlayArrow />
                            </IconButton>
                        )}
                        <IconButton
                            color="inherit"
                            disabled={combatState.round < 1}
                            onClick={() =>
                                advanceTurn({
                                    byTurns: 1,
                                    combatants: combatState.combatants,
                                    apRefreshType: combatSettings.initiativeVersion.value
                                })
                            }
                        >
                            <SkipNext />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton edge="end" onClick={handleAddMenuOpen} color="inherit">
                            <Add />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {addMenu}
        </>
    );
};

export default TopBar;
