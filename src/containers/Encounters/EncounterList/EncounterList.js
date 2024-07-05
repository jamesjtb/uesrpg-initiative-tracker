import { Add, Save } from '@mui/icons-material';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { useContext } from 'react';
import { CrossedSwords } from '../../../components/rpg-awesome/weapons-and-armor';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';
import { EncounterListContext } from '../../../contextProviders/encounterList';
import EncounterRow from './EncounterRow';

const EncounterList = () => {
    const { encounterList } = useContext(EncounterListContext);

    return (
        <Box sx={{ overflow: 'auto', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <Divider>
                    <Typography variant="h5" color="primary">
                        Encounter List
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
                        <Tooltip title="Add New Encounter">
                            <IconButton color="primary" onClick={() => []}>
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Combatants</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {encounterList.map(encounter => (
                        <EncounterRow encounter={encounter} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default EncounterList;
