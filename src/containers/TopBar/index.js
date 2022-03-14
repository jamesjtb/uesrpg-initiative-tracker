import React, { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
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

import AppMenu from './AppMenu';

import { CombatContext } from '../../contextProviders/combat';
import { SettingsContext } from '../../contextProviders/settings';

import { combatantTypes } from '../../contextProviders/combat/values';

const TopBar = () => {

  const {
    combatState,
    initiateCombat,
    stopCombat,
    advanceTurn,
    addCombatant
  } = useContext(CombatContext);

  const {
    settingsState
  } = useContext(SettingsContext);

  /****************** */
  const [addMenuAnchor, setAddMenuAnchor] = useState(null);
  const isAddMenuOpen = Boolean(addMenuAnchor);

  const handleAddMenuOpen = (event) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddMenuAnchor(null);
  };

  const handleAddMenuClick = (type) => {
    addCombatant(type)
    handleAddMenuClose();
  };

  /*********** */
  const [appMenuAnchor, setAppMenuAnchor] = useState(null);
  const isAppMenuOpen = Boolean(appMenuAnchor);

  const handleAppMenuClose = () => {
    setAppMenuAnchor(null);
  };

  const handleAppMenuOpen = e => {
    setAppMenuAnchor(e.currentTarget);
  };

  const addMenu = (
    <Menu
      anchorEl={addMenuAnchor}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id="add-character-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isAddMenuOpen}
      onClose={handleAddMenuClose}
    >
      <MenuItem onClick={() => handleAddMenuClick(combatantTypes.PC)}>Add Player Character</MenuItem>
      <MenuItem onClick={() => handleAddMenuClick(combatantTypes.NPC)}>Add Non-Player Character</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
          <Box>
            <IconButton onClick={e => handleAppMenuOpen(e)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton color="inherit" disabled={combatState.round < 1 || (combatState.round === 1 && combatState.turn === 1)} onClick={() => advanceTurn({ byTurns: -1, combatants: combatState.combatants })}>
              <SkipPrevious />
            </IconButton>
            {combatState.round > 0 ? 
              <IconButton color="inherit" onClick={stopCombat}>
                <Stop />
              </IconButton> : 
              combatState.round === 0 ? 
                <IconButton disabled>
                  <CircularProgress color="secondary" />
                </IconButton> :
                <IconButton color="inherit" onClick={initiateCombat}>
                  <PlayArrow />
                </IconButton>
            }
            <IconButton
              color="inherit"
              disabled={combatState.round < 1}
              onClick={() =>
                advanceTurn({
                  byTurns: 1,
                  combatants: combatState.combatants,
                  apRefreshType: settingsState
                    .userSettings.find(settingsArea => settingsArea.displayName === 'Combat')
                    .settingItems.find(settingItem => settingItem.displayName === 'Initiative Version')
                    .values.find(valueObject => valueObject.selected === true)
                    .name
                })
              }
            >
              <SkipNext />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              edge="end"
              onClick={handleAddMenuOpen}
              color="inherit"
            >
              <Add />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {addMenu}
      <AppMenu anchorEl={appMenuAnchor} open={isAppMenuOpen} closeAppMenu={handleAppMenuClose} />
    </>
  );
};

export default TopBar;