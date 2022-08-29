import React, { useContext } from 'react';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';

import Save from '@mui/icons-material/Save';
import Folder from '@mui/icons-material/Folder';
import Clear from '@mui/icons-material/Clear';
import Settings from '@mui/icons-material/Settings';

import { CombatContext } from '../../../contextProviders/combat';
import { combatantTypes } from '../../../contextProviders/combat/values';

const AppMenu = ({ anchorEl, open, closeAppMenu, setSettingsModalOpen }) => {
    const { combatState, setCombatants } = useContext(CombatContext);

    const saveToFile = async type => {
        await window.fs.saveCombatants(
            type,
            combatState.combatants.filter(c => c.type === type)
        );
        closeAppMenu();
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
        closeAppMenu();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeAppMenu}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box>
                <MenuList onClick={closeAppMenu}>
                    <MenuItem onClick={loadFile}>
                        <ListItemIcon>
                            <Folder fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>Load from File</Typography>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => saveToFile(combatantTypes.PC)}>
                        <ListItemIcon>
                            <Save fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>Save Party to File</Typography>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => saveToFile(combatantTypes.NPC)}>
                        <ListItemIcon>
                            <Save fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>Save Encounter to File</Typography>
                        </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => setSettingsModalOpen(true)}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>Settings</Typography>
                        </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => window.app.quit()}>
                        <ListItemIcon>
                            <Clear fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>Exit</Typography>
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </Box>
        </Menu>
    );
};

export default AppMenu;
