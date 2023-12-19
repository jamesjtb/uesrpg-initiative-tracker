import { Box, Modal, Typography } from '@mui/material';

const LoadoutModal = ({isOpen, combatant, statblock, onClose}) => {
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
        borderRadius: 2
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h4" color="primary">{combatant.name} Loadout</Typography>
                {statblock?.equipment?.length > 0 ? <Typography variant="h6" color="secondary">Equipment Options:</Typography> : undefined}
                {statblock?.equipment?.map(e => <p>{e.name}</p>)}
                {statblock?.spells?.length > 0 ? <Typography variant="h6" color="secondary">Spell Options:</Typography> : undefined}
                {statblock?.spells?.map(e => <p>{e.name}</p>)}
            </Box>
        </Modal>
    )
};

export default LoadoutModal;
