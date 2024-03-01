import { TableRow, Typography } from '@mui/material';
import { StyledTableCell } from '../../../../components/StyledComponents/TableCell';
import CombatantActions from '../CombatantActions';
import ColorSelector from '../../../../components/ColorSelector';
import { useContext, useState } from 'react';
import { EncounterContext } from '../../../../contextProviders/activeEncounter';

const EncounterCombatant = ({ combatant, npcStatblocks }) => {
    const [selectedColor, setSelectedColor] = useState(combatant.labelColor);
    const { editCombatant } = useContext(EncounterContext);

    const handleColorSelect = e => {
        const colorValue = e.target.value;
        editCombatant({...combatant, labelColor: colorValue})

        setSelectedColor(colorValue);

    };

    return (
        <TableRow key={combatant.id}>
            <StyledTableCell align="left">
                <Typography component="span">{combatant.name}</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
                <Typography component="span">
                    <ColorSelector
                        value={selectedColor}
                        onChange={handleColorSelect}
                        label="Color"
                    />
                </Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
                <CombatantActions
                    combatant={combatant}
                    statblock={npcStatblocks[combatant.npcId]}
                />
            </StyledTableCell>
        </TableRow>
    );
};

export default EncounterCombatant;
