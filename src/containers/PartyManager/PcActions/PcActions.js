import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
import HorizontalRule from '@mui/icons-material/HorizontalRule';

import { QuillInk } from '../../../components/rpg-awesome/inventory';
import useConfirmation from '../../../components/useConfirmation/useConfirmation';

import { openChildWindow } from '../../../util/utils';

const PcActions = ({ pc }) => {
    const [getConfirmation, Confirmation] = useConfirmation();

    const deletePc = async () => {
        if ((await getConfirmation(`Delete ${pc.playerName}'s player character ${pc.characterName}?`))) {
            await window.playerCharacters.delete(pc._id);
        }
    };

    const openPcEditor = () => {
        openChildWindow(`/views/pceditor/${pc._id}`, {
            height: 395,
            width: 675,
            modal: true,
        });
    };

    const togglePcActive = () => {
        window.playerCharacters.write({ ...pc, active: !pc.active });
    };

    return (
        <>
            <Tooltip
                title={pc.active ? 'Remove from Active Party' : 'Add to Active Party'}
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton color="primary" size="small" onClick={togglePcActive}>
                    {pc.active ? <HorizontalRule fontSize="inherit" /> : <Add fontSize="inherit" />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={openPcEditor}>
                    <QuillInk fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={deletePc}>
                    <Clear fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Confirmation />
        </>
    );
};

export default PcActions;
