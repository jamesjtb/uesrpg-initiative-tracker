import React, {useContext} from 'react';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'

import Box from '@mui/material/Box';

import Save from '@mui/icons-material/Save';
import Folder from '@mui/icons-material/Folder';
import Clear from '@mui/icons-material/Clear';

import { CombatantContext } from '../../../contextProviders/combatant';
import { combatantTypes } from '../../../contextProviders/combatant/values';

const AppMenu = ({ anchorEl, open, closeAppMenu }) => {

  const { combatants } = useContext(CombatantContext);

  const saveToFile = async (type) => {
    const result = await window.fs.saveCombatants(type, combatants.filter(c => c.type === combatantTypes.PC));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={closeAppMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <Box>
        <MenuList>
          <MenuItem>
            <ListItemIcon><Folder fontSize="small" /></ListItemIcon>
            <ListItemText><Typography>Load from File</Typography></ListItemText>
          </MenuItem>
          <MenuItem onClick={() => saveToFile('party')}>
            <ListItemIcon><Save fontSize="small" /></ListItemIcon>
            <ListItemText><Typography>Save Party to File</Typography></ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon><Save fontSize="small" /></ListItemIcon>
            <ListItemText><Typography>Save Encounter to File</Typography></ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon><Clear fontSize="small" /></ListItemIcon>
            <ListItemText><Typography>Exit</Typography></ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  )
};

export default AppMenu;