import React, { useContext, useEffect, useState } from 'react';

import { Box, Divider, Grid, IconButton, TableContainer, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';
import { Save } from '../../../components/rpg-awesome/electronics';
import { CrossedSwords } from '../../../components/rpg-awesome/weapons-and-armor';
import useSaveDialog from '../../../components/useSaveDialog';
import { EncounterContext } from '../../../contextProviders/activeEncounter';
import { EncounterListContext } from '../../../contextProviders/encounterList';
import EncounterCombatant from './EncounterCombatant/EncounterCombatant';

const EncounterBuilder = () => {
    const { encounterState, setEncounterName } = useContext(EncounterContext);
    const { addEncounter } = useContext(EncounterListContext);
    const [npcStatblocks, setNpcStatblocks] = useState({});
    const [getSaveName, SaveDialog] = useSaveDialog();

    useEffect(() => {
        (async () => {
            for (const combatant of encounterState.combatants) {
                const statblock = await window.bestiary.getOne(combatant.npcId);
                if (encounterState?.combatants)
                    setNpcStatblocks(n => ({ ...n, [combatant.npcId]: statblock }));
            }
        })();
    }, [encounterState.combatants]);

    const onSaveEncounter = async () => {
        const saveName = await getSaveName('Encounter', encounterState.name);
        setEncounterName(saveName);
        addEncounter(encounterState);
    };

    return (
        <Box sx={{ height: '40vh', overflow: 'hidden', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <Divider>
                    <Typography variant="h5" color="primary">
                        Encounter Builder
                    </Typography>
                </Divider>
                <Grid container>
                    <Grid
                        item
                        xs={10}
                        textAlign="left"
                        sx={{ '& > :not(style)': { mr: 1, ml: 1 } }}
                    >
                        <Typography variant="h5" color="primary">
                            {encounterState.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                        <Tooltip title="Save Encounter">
                            <IconButton color="primary" onClick={onSaveEncounter}>
                                <Save fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add All to Initiative Tracker">
                            <IconButton color="primary" onClick={() => {}}>
                                <CrossedSwords fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer style={{ maxHeight: '30vh', padding: 0 }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="center">Label Color</StyledTableCell>
                            <StyledTableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {encounterState?.combatants?.map(combatant => (
                            <EncounterCombatant
                                key={combatant.id}
                                combatant={combatant}
                                npcStatblocks={npcStatblocks}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {SaveDialog}
        </Box>
    );
};

export default EncounterBuilder;
