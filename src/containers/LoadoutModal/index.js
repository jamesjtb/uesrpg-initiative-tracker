import { Box, Button, Modal, Typography } from '@mui/material';
import CheckboxInput from '../../components/CheckboxInput';
import { useContext } from 'react';
import { EncounterContext } from '../../contextProviders/activeEncounter';

const loadoutItemTypes = {
    SPELL: 'spellIds',
    EQUIPMENT: 'equipmentIds',
};

const LoadoutModal = ({ isOpen, combatant, statblock, onClose }) => {
    const { editCombatant } = useContext(EncounterContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        maxHeight: '80vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const toggleInLoadout = (type, value) => {
        const updatedCombatant = JSON.parse(JSON.stringify(combatant));
        const existingIndex = updatedCombatant.loadout[type].indexOf(value);
        existingIndex === -1
            ? updatedCombatant.loadout[type].push(value)
            : updatedCombatant.loadout[type].splice(existingIndex, 1);
        editCombatant(updatedCombatant);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h4" color="primary">
                    {combatant.name} Loadout
                </Typography>
                {statblock?.equipment?.length > 0 ? (
                    <Typography variant="h6" color="secondary">
                        Equipment Options:
                    </Typography>
                ) : undefined}
                {statblock?.equipment?.map(e => (
                    <CheckboxInput
                        key={e.id}
                        name={e.name}
                        value={combatant?.loadout?.equipmentIds?.includes(e.id)}
                        onChange={() => toggleInLoadout(loadoutItemTypes.EQUIPMENT, e.id)}
                    />
                ))}
                {statblock?.spells?.length > 0 ? (
                    <Typography variant="h6" color="secondary">
                        Spell Options:
                    </Typography>
                ) : undefined}
                {statblock?.spells?.map(e => (
                    <CheckboxInput
                        key={e.id}
                        name={e.description}
                        value={combatant?.loadout?.spellIds?.includes(e.id)}
                        onChange={() => toggleInLoadout(loadoutItemTypes.SPELL, e.id)}
                    />
                ))}
                <Button onClick={onClose}>Done</Button>
            </Box>
        </Modal>
    );
};

export default LoadoutModal;
