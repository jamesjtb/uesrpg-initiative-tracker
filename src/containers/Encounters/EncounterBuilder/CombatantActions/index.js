import React, { useContext, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';

import { CrossedSwords } from '../../../../components/rpg-awesome/weapons-and-armor';
import useConfirmation from '../../../../components/useConfirmation/useConfirmation';
import { EncounterContext } from '../../../../contextProviders/activeEncounter';
import LoadoutModal from '../../../LoadoutModal';
import { RaIcon } from '../../../../components/rpg-awesome';

const CombatantActions = ({ combatant, statblock }) => {
    const [isLoadoutModalOpen, setIsLoadoutModalOpen] = useState(false);

    const [getConfirmation, Confirmation] = useConfirmation();
    const { removeCombatant } = useContext(EncounterContext);

    const handleRemoveCombatant = async () => {
        if (await getConfirmation(`Remove ${combatant.name}?`)) {
            await removeCombatant(combatant.id);
        }
    };

    const handleLoadoutModalClose = async () => {
        setIsLoadoutModalOpen(false);
    }

    return (
        <>
            <LoadoutModal isOpen={isLoadoutModalOpen} combatant={combatant} statblock={statblock} onClose={handleLoadoutModalClose} />
            <Tooltip
                title={'Add to Initiative Tracker'}
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton
                    color="primary"
                    size="small"
                    onClick={() => console.log('Add to Initiative')}
                >
                    <CrossedSwords fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Loadout" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={() => setIsLoadoutModalOpen(true)}>
                    <RaIcon iconName="ra-forging" fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip
                title="Remove Combatant"
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton color="primary" size="small" onClick={handleRemoveCombatant}>
                    <Clear fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Confirmation />
        </>
    );
};

export default CombatantActions;
