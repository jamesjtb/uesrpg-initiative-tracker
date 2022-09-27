import React, { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Add from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import { openChildWindow } from '../../util/utils';
import { useEffect } from 'react';

import NpcList from './NpcList/NpcList';

const Bestiary = () => {
    const [npcs, setNpcs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const getNpcs = useCallback(async () => {
        const npcResult = await window.bestiary.get({ isVariant: false }, { name: 1 });
        setNpcs(npcResult);
    }, [setNpcs]);

    useEffect(() => {
        getNpcs();
    }, [getNpcs]);

    window.bestiary.onUpdate(() => getNpcs());

    return (
        <Container sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" justifyContent="center">
                <Typography sx={{ mb: 2 }} variant="h4" color="primary">
                    Bestiary
                </Typography>
                <Box sx={{ mb: 2, width: "100%" }}>
                    <Grid container>
                        <Grid xs={6} textAlign="left">
                            <TextField label="Search" variant="standard" />
                        </Grid>
                        <Grid xs={6} textAlign="right">
                            <Tooltip title="Add New NPC">
                                <IconButton
                                    onClick={() =>
                                        openChildWindow('/views/npceditor', {
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
                    npcs={npcs.slice(pageSize * currentPage - pageSize, pageSize * currentPage)}
                />
                <Pagination
                    size="large"
                    count={Math.ceil(npcs.length / pageSize) || 1}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                />
            </Stack>
        </Container>
    );
};

export default Bestiary;
