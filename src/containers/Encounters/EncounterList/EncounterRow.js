import { TableRow, Typography } from '@mui/material';
import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

const EncounterRow = ({ encounter }) => {
    return (
        <TableRow key={encounter._id}>
            <StyledTableCell>
                <Typography component="span">{encounter.name}</Typography>
            </StyledTableCell>
            <StyledTableCell>
                <Typography component="span">{encounter.combatants.length}</Typography>
            </StyledTableCell>
        </TableRow>
    );
};

export default EncounterRow;
