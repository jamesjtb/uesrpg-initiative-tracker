import React, { useState } from 'react';

import classes from './App.module.css';

import Box from '@mui/material/Box';

import TopBar from './containers/TopBar';
import SideDrawer from './containers/SideDrawer/SideDrawer';
import InitiativeList from './containers/InitiativeList';
import InitiativeModal from './containers/InitiativeModal';
import SettingsModal from './containers/SettingsModal';
import Updater from './containers/Updater';

import parchmentBackground from './assets/parchment.jpg';

import { CombatProvider } from './contextProviders/combat';

function App() {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    // const handleKeyPress = (e) => {
    //   if (e.ctrlKey && e.shiftKey && e.key === ' ') return handleCombatStop();
    //   if (e.ctrlKey && e.key === " ") combatState.round < 0 ? handleCombatStart() : advanceTurn(1);
    //   if (e.ctrlKey && e.key === 'Backspace') advanceTurn(-1);
    // };

    return (
        // onKeyDown={handleKeyPress}
        <Box
            tabIndex="0"
            className={classes.App}
            sx={{
                backgroundImage: `url(${parchmentBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                display: 'flex',
            }}
        >
            <CombatProvider>
                <TopBar
                    toggleSideDrawer={() => setSideDrawerOpen(!sideDrawerOpen)}
                    isSideDrawerOpen={sideDrawerOpen}
                />
                <SideDrawer
                    open={sideDrawerOpen}
                    toggle={() => setSideDrawerOpen(!sideDrawerOpen)}
                    setSettingsModalOpen={setSettingsModalOpen}
                    onTriggerUpdate={() => setTriggerUpdate(true)}
                />

                <Box
                    className={classes.InitiativeContainer}
                    component="main"
                    sx={{ flexGrow: 1, overflowY: 'auto' }}
                >
                    <InitiativeList />
                </Box>
                <InitiativeModal />
                <SettingsModal open={settingsModalOpen} setOpen={setSettingsModalOpen} />
            </CombatProvider>
            <Updater triggerUpdate={triggerUpdate} onUpdateComplete={() => setTriggerUpdate(false)} />
        </Box>
    );
}

export default App;
