import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        padding: `${theme.spacing(0.5)}`,
    },
    [`&.${tableCellClasses.body}`]: {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        borderTop: `2px solid ${theme.palette.secondary.main}`,
        padding: `0 ${theme.spacing(0.5)}`,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
}));