import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';

import { QuillInk } from '../../../components/rpg-awesome/inventory';
import { Anvil, CrossedSwords } from '../../../components/rpg-awesome/weapons-and-armor';
import useConfirmation from '../../../components/useConfirmation/useConfirmation';

import { openChildWindow } from '../../../util/utils';

const NpcActions = ({ npc }) => {
    const [getConfirmation, Confirmation] = useConfirmation();

    const deleteNpc = async () => {
        if (await getConfirmation(`Delete ${npc.name}?`)) {
            await window.bestiary.delete(npc._id);
        }
    };

    const openNpcEditor = () => {
        openChildWindow(`views/npceditor/${npc._id}`, {
            modal: true,
        });
    };

    const addNpcToEncounter = () => {};
    const addNpcToInitiative= () => {};

    return (
        <>
            <Tooltip
                title={'Add to Encounter Builder'}
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton color="primary" size="small" onClick={addNpcToEncounter}>
                    <Anvil fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={'Add to Initiative Tracker'}
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton color="primary" size="small" onClick={addNpcToInitiative}>
                    <CrossedSwords fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={openNpcEditor}>
                    <QuillInk fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={deleteNpc}>
                    <Clear fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Confirmation />
        </>
    );
};

export default NpcActions;
