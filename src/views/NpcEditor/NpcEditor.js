import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DraggableViewBase from '../../components/DraggableViewBase/DraggableViewBase';
import StatTable from './StatTable/StatTable';

const NpcEditor = () => {
    const [name, setName] = useState('');
    const [flavorText, setFlavorText] = useState('');
    const [race, setRace] = useState('');
    const [type, setType] = useState('');
    const [threatRating, setThreatRating] = useState('');
    const [soulEnergy, setSoulEnergy] = useState('');
    const [stats, setStats] = useState({
        strength: 0,
        endurance: 0,
        agility: 0,
        intelligence: 0,
        willpower: 0,
        perception: 0,
        personality: 0,
        luck: 0,
        hitPoints: 0,
        woundThreshold: 0,
        magicka: 0,
        stamina: 0,
        initiative: 0,
        actionPoints: 0,
        speed: 0,
        size: 'Standard',
        combat: 0,
        magic: 0,
        evade: 0,
        observe: 0,
        stealth: 0,
        knowledge: 0,
        social: 0,
        physical: 0,
    });
    return (
        <DraggableViewBase title={`NPC Editor`}>
            <Box sx={{ ml: 5, mr: 5, mt: 3 }}>
                <Grid container sx={{ mb: 1 }} rowSpacing={1} columnSpacing={2}>
                    <Grid xs={6}>
                        <TextField
                            variant="standard"
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={6} />
                    <Grid xs={12}>
                        <TextField
                            label="Flavor Text"
                            multiline
                            variant="standard"
                            fullWidth
                            value={flavorText}
                            onChange={e => setFlavorText(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Race / Subtype"
                            fullWidth
                            value={race}
                            onChange={e => setRace(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Type"
                            fullWidth
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Threat Rating"
                            fullWidth
                            value={threatRating}
                            onChange={e => setThreatRating(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Soul Energy / Type"
                            fullWidth
                            value={soulEnergy}
                            onChange={e => setSoulEnergy(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <StatTable stats={stats} setStats={setStats} />
                <Stack sx={{ mt: 1 }}>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Unconventional Skills
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Weapons and Armor
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Special Abilities
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Traits
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Encountering
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Loot
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Special Hit Charts
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </DraggableViewBase>
    );
};

export default NpcEditor;
