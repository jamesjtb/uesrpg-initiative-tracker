import { Box } from '@mui/system';
import React from 'react';

import DraggableViewBase from '../../components/DraggableViewBase/DraggableViewBase';
import StatTable from './StatTable/StatTable';

const NpcEditor = () => {
    return (
        <DraggableViewBase title={`NPC Editor`}>
            <Box sx={{ ml: 5, mr: 5, mt: 3 }}>
                <StatTable />
            </Box>
        </DraggableViewBase>
    );
};

export default NpcEditor;
