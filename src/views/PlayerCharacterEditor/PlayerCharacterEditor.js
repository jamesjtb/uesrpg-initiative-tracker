import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import DraggableViewBase from '../../components/DraggableViewBase/DraggableViewBase';
import { Button } from '@mui/material';

import { useParams } from 'react-router-dom';

const PcEditor = () => {
    const { pcId } = useParams();

    const [playerName, setPlayerName] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [hitPoints, setHitPoints] = useState(0);
    const [magicka, setMagicka] = useState(0);
    const [staminaPoints, setStaminaPoints] = useState(0);
    const [actionPoints, setActionPoints] = useState(3);
    const [initiativeRating, setInitiativeRating] = useState(0);
    const [luckPoints, setLuckPoints] = useState(0);
    const [xpAmount, setXpAmount] = useState(0);

    const onSave = async () => {
        const playerCharacter = {
            playerName,
            characterName,
            hitPoints,
            magicka,
            staminaPoints,
            actionPoints,
            initiativeRating,
            luckPoints,
            xpAmount,
            active: false,
        }
        if (pcId) playerCharacter._id = pcId;
        await window.playerCharacters.write(playerCharacter);
        window.close();
    };

    useEffect(() => {
        (async () => {
            if (pcId) {
                const pc = await window.playerCharacters.getOne(pcId);
                setPlayerName(pc.playerName);
                setCharacterName(pc.characterName);
                setHitPoints(pc.hitPoints);
                setMagicka(pc.magicka);
                setStaminaPoints(pc.staminaPoints);
                setActionPoints(pc.actionPoints);
                setInitiativeRating(pc.initiativeRating);
                setLuckPoints(pc.luckPoints);
                setXpAmount(pc.xpAmount);
            }
        })();
    }, [pcId]);

    return (
        <DraggableViewBase title={`PC Editor ${pcId ? `(${characterName})` : '(New)'}`}>
            <Box sx={{ ml: 5, mr: 5, mt: 3 }}>
                <Grid container>
                    <Grid sx={{ mb: 2 }} xs={8} />
                    <Grid sx={{ mb: 2 }} xs={4}>
                        <TextField
                            sx={{ width: '85%' }}
                            label="XP"
                            variant="standard"
                            value={xpAmount}
                            onChange={e => setXpAmount(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            sx={{ width: '85%' }}
                            label="Player Name"
                            variant="standard"
                            value={playerName}
                            onChange={e => setPlayerName(e.target.value)}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={8}>
                        <TextField
                            sx={{ width: '90%' }}
                            label="Character Name"
                            variant="standard"
                            value={characterName}
                            onChange={e => setCharacterName(e.target.value)}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Hit Points"
                            type="number"
                            variant="standard"
                            value={hitPoints}
                            onChange={e => setHitPoints(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Magicka"
                            type="number"
                            variant="standard"
                            value={magicka}
                            onChange={e => setMagicka(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Stamina Points"
                            type="number"
                            variant="standard"
                            value={staminaPoints}
                            onChange={e => setStaminaPoints(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Action Points"
                            type="number"
                            variant="standard"
                            value={actionPoints}
                            onChange={e => setActionPoints(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Initiative Rating"
                            type="number"
                            variant="standard"
                            value={initiativeRating}
                            onChange={e => setInitiativeRating(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mb: 2 }} display="flex" justifyContent="center" xs={4}>
                        <TextField
                            label="Luck Points"
                            type="number"
                            variant="standard"
                            value={luckPoints}
                            onChange={e => setLuckPoints(parseInt(e.target.value || 0))}
                        />
                    </Grid>
                    <Grid sx={{ mt: 2 }} display="flex" justifyContent="right" xs={12}>
                        <Button sx={{ mr: 2 }} variant="outlined" onClick={() => window.close()}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </DraggableViewBase>
    );
};

export default PcEditor;
