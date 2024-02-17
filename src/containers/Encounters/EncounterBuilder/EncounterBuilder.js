import React, { useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';
import { EncounterContext } from '../../../contextProviders/activeEncounter';
import CombatantActions from './CombatantActions';
import { Box, Divider, Grid, IconButton, Tooltip } from '@mui/material';
import { Save } from '../../../components/rpg-awesome/electronics';

const EncounterBuilder = () => {
    const { encounterState } = useContext(EncounterContext);
    const [npcStatblocks, setNpcStatblocks] = useState({});

    useEffect(() => {
        (async () => {
            for (const combatant of encounterState.combatants) {
                const statblock = await window.bestiary.getOne(combatant.npcId);
                if (encounterState?.combatants)
                    setNpcStatblocks(n => ({ ...n, [combatant.npcId]: statblock }));
            }
        })();
    }, [encounterState.combatants]);

    return (
        <Box sx={{ height: '30vh', overflow: 'auto', width: '100%' }}>
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
                    ></Grid>
                    <Grid item xs={2} textAlign="right">
                        <Tooltip title="Add New NPC">
                            <IconButton color="primary" onClick={() => []}>
                                <Save fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="right">Label Color</StyledTableCell>
                        <StyledTableCell align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {encounterState?.combatants?.map(combatant => (
                        <TableRow key={combatant.id}>
                            <StyledTableCell align="left">
                                <Typography component="span">{combatant.name}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Typography component="span">something</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <CombatantActions
                                    combatant={combatant}
                                    statblock={npcStatblocks[combatant.npcId]}
                                />
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default EncounterBuilder;
