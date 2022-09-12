import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';

import { QuillInk } from '../../../components/rpg-awesome/inventory';

const PcActions = ({ pc }) => {
    
    const deletePc = () => {
        window.playerCharacters.delete(pc._id);
    };

    const openPcEditor = () => {
        window.open(
            `/views/pceditor/${pc._id}`,
            '_blank',
            'top=0,left=0,height=395,width=675',
        );
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
