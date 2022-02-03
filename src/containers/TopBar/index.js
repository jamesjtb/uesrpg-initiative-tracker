import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Add from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

const TopBar = ({addCharacter}) => {

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
      <MenuItem onClick={() => handleAddMenuClick({type: 'add-pc'})}>Add Player Character</MenuItem>
      <MenuItem onClick={() => handleAddMenuClick({type: 'add-npc'})}>Add Non-Player Character</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            UESRPG Initiative Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'non', md: 'flex' } }}>
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