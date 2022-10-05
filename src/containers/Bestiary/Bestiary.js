import React, { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';

import { openChildWindow } from '../../util/utils';
import { useEffect } from 'react';

import NpcList from './NpcList/NpcList';

const Bestiary = () => {
    const [npcs, setNpcs] = useState([]);
    const [filteredNpcs, setFilteredNpcs] = useState([]);

    const [nameSearch, setNameSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [threatSearch, setThreatSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const getNpcs = useCallback(async () => {
        const npcResult = await window.bestiary.get({ isVariant: false }, { name: 1 });
        setNpcs(npcResult);
    }, [setNpcs]);

    useEffect(() => {
        getNpcs();
    }, [getNpcs]);

    useEffect(() => {
        setFilteredNpcs(npcs.filter(npc => 
            (nameSearch === '' || npc.name?.toLowerCase().includes(nameSearch.toLowerCase()))
            && (typeSearch === '' || (npc.type?.toLowerCase().includes(typeSearch.toLowerCase()) || npc.race?.toLowerCase().includes(typeSearch.toLowerCase())))
            && (threatSearch === '' || npc.threatRating?.toLowerCase().includes(threatSearch.toLowerCase()))))
    }, [nameSearch, typeSearch, threatSearch, npcs])

    window.bestiary.onUpdate(() => getNpcs());

    return (
        <Container sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" justifyContent="center">
                <Typography sx={{ mb: 2 }} variant="h4" color="primary">
                    Bestiary
                </Typography>
                <Box sx={{ mb: 2, width: '100%' }}>
                    <Grid container>
                        <Grid xs={10} textAlign="left" sx={{ '& > :not(style)': { mr: 1, ml: 1 } }}>
                            <TextField
                                label="Name"
                                variant="standard"
                                InputProps={{ endAdornment: <Search position="end" /> }}
                                value={nameSearch}
                                onChange={e => setNameSearch(e.target.value)}
                            />
                            <TextField
                                label="Type"
                                variant="standard"
                                InputProps={{ endAdornment: <Search position="end" /> }}
                                value={typeSearch}
                                onChange={e => setTypeSearch(e.target.value)}
                            />
                            <TextField
                                label="Threat"
                                variant="standard"
                                InputProps={{ endAdornment: <Search position="end" /> }}
                                value={threatSearch}
                                onChange={e => setThreatSearch(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={2} textAlign="right">
                            <Tooltip title="Add New NPC">
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        openChildWindow('views/npceditor', {
                                            modal: true,
                                        })
                                    }
                                >
                                    <Add fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <NpcList
                    npcs={filteredNpcs.slice(pageSize * currentPage - pageSize, pageSize * currentPage)}
                />
                <Pagination
                    sx={{ mt: 2 }}
                    size="large"
                    count={Math.ceil(filteredNpcs.length / pageSize) || 1}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                    color="primary"
                />
            </Stack>
        </Container>
    );
};

export default Bestiary;
