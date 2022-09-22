import React from 'react';

import { Route, Routes } from 'react-router-dom';
import NpcEditor from './NpcEditor/NpcEditor';

import PlayerCharacterEditor from './PlayerCharacterEditor/PlayerCharacterEditor';

const Views = () => {
    return (
        <Routes>
            <Route path="/pceditor" element={<PlayerCharacterEditor />}>
                <Route path=":pcId" element={<PlayerCharacterEditor />} />
            </Route>
            <Route path="/npceditor" element={<NpcEditor />}>
                <Route path=":npcId" element={<NpcEditor />} />
            </Route>
        </Routes>
    );
};

export default Views;