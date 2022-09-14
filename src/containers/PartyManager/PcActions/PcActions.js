import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';

import { QuillInk } from '../../../components/rpg-awesome/inventory';

import { openChildWindow } from '../../../util/utils';

const PcActions = ({ pc }) => {
    
    const deletePc = () => {
        window.playerCharacters.delete(pc._id);
    };

    const openPcEditor = () => {
        openChildWindow(`/views/pceditor/${pc._id}`, {
            height: 395,
            width: 675,
            modal: true,
        });
    };

    return (
        <>
            <Tooltip title="Edit" enterNextDelay={700} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={openPcEditor}>
                    <QuillInk fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" enterNextDelay={700} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={deletePc}>
                    <Clear fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default PcActions;
