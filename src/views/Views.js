import React from 'react';

import { Route, Routes } from 'react-router-dom';

import PlayerCharacterEditor from './PlayerCharacterEditor/PlayerCharacterEditor';

const Views = () => {
    return (
        <Routes>
            <Route path="/pceditor" element={<PlayerCharacterEditor />}>
                <Route path=":pcId" element={<PlayerCharacterEditor />} />
            </Route>
        </Routes>
    );
};

export default Views;