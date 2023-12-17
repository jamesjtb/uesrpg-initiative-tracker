import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import classes from './App.module.css';

import Box from '@mui/material/Box';

import AppMenu from './containers/AppMenu/AppMenu';
import InitiativeList from './containers/InitiativeList';
import Encounters from './containers/Encounters/Encounters';
import Bestiary from './containers/Bestiary/Bestiary';
import PartyManager from './containers/PartyManager/PartyManager';
import InitiativeModal from './containers/InitiativeModal';
import SettingsModal from './containers/SettingsModal';
import Updater from './containers/Updater';

import parchmentBackground from './assets/parchment.jpg';

import { CombatProvider } from './contextProviders/combat';
import { EncounterProvider } from './contextProviders/activeEncounter';

function App() {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [appMenuOpen, setAppMenuOpen] = useState(false);
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
                <EncounterProvider>
                    <AppMenu
                        open={appMenuOpen}
                        toggle={() => setAppMenuOpen(!appMenuOpen)}
                        setSettingsModalOpen={setSettingsModalOpen}
                        onTriggerUpdate={() => setTriggerUpdate(true)}
                    />
                    <Box
                        className={classes.ContentContainer}
                        component="main"
                        sx={{ flexGrow: 1, overflowY: 'auto' }}
                    >
                        <Routes>
                            <Route path="/" element={<InitiativeList />} />
                            <Route path="encounter-builder" element={<Encounters />} />
                            <Route path="bestiary" element={<Bestiary />} />
                            <Route path="party" element={<PartyManager />} />
                        </Routes>
                    </Box>
                    <InitiativeModal />
                    <SettingsModal open={settingsModalOpen} setOpen={setSettingsModalOpen} />
                </EncounterProvider>
            </CombatProvider>
            <Updater
                triggerUpdate={triggerUpdate}
                onUpdateComplete={() => setTriggerUpdate(false)}
            />
        </Box>
    );
}

export default App;
