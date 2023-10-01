import React, { useContext, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import PlayArrow from '@mui/icons-material/PlayArrow';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Stop from '@mui/icons-material/Stop';
import CircularProgress from '@mui/material/CircularProgress';

import { CombatContext } from '../../contextProviders/combat';

const InitiativeControlCard = () => {
    const { combatState, initiateCombat, stopCombat, advanceTurn } =
        useContext(CombatContext);

    const [combatSettings, setCombatSettings] = useState(null);

    window.settings.onUpdate(() => {
        (async () => {
            const newCombatSettings = await window.settings.get('combat');
            setCombatSettings({ ...newCombatSettings });
        })();
    });

    useEffect(() => {
        (async () => {
            const newCombatSettings = await window.settings.get('combat');
            setCombatSettings({ ...newCombatSettings });
        })();
    }, []);


    return (
        <Card sx={{display: 'inline-block', mb: '1vh'}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    color="inherit"
                    disabled={
                        combatState.round < 1 || (combatState.round === 1 && combatState.turn === 1)
                    }
                    onClick={() => advanceTurn({ byTurns: -1, combatants: combatState.combatants })}
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
                            apRefreshType: combatSettings.apRefreshType.value,
                        })
                    }
                >
                    <SkipNext />
                </IconButton>
            </Box>
        </Card>
    );
};

export default InitiativeControlCard;
