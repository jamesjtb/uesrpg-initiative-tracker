import React, { useState } from 'react';

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

const TopBar = ({ addCharacter, handleCombatStart, handleCombatStop, combatState, advanceTurn }) => {

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = Boolean(menuAnchor);

  const handleAddMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAddMenuClick = (characterModalSettings) => {
    addCharacter(characterModalSettings)
    handleMenuClose();
  };

  const addMenu = (
    <Menu
      anchorEl={menuAnchor}
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
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleAddMenuClick({ type: 'add-pc' })}>Add Player Character</MenuItem>
      <MenuItem onClick={() => handleAddMenuClick({ type: 'add-npc' })}>Add Non-Player Character</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
          <Box>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton color="inherit" disabled={combatState.round < 1 || (combatState.round === 1 && combatState.turn === 1)} onClick={() => advanceTurn(-1)}>
              <SkipPrevious />
            </IconButton>
            {combatState.round > 0 ? 
              <IconButton color="inherit" onClick={handleCombatStop}>
                <Stop />
              </IconButton> : 
              combatState.round === 0 ? 
                <IconButton disabled>
                  <CircularProgress color="secondary" />
                </IconButton> :
                <IconButton color="inherit" onClick={handleCombatStart}>
                  <PlayArrow />
                </IconButton>
            }
            <IconButton color="inherit" disabled={combatState.round < 1} onClick={() => advanceTurn(1)}>
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
    </>
  );
};

export default TopBar;