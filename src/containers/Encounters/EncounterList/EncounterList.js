import { Save } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Table, TableBody, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { CrossedSwords } from '../../../components/rpg-awesome/weapons-and-armor'
import { StyledTableCell } from '../../../components/StyledComponents/TableCell'

const EncounterList = () => {
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
                        <Tooltip title="Save Encounter">
                            <IconButton color="primary" onClick={() => []}>
                                <Save fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add All to Initiative Tracker">
                            <IconButton color="primary" onClick={() => []}>
                                <CrossedSwords fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
        </Box>
    )
};

export default EncounterList;