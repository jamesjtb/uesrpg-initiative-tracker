import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import MultiSelectInput from '../../../components/MultiSelectInput';
import CheckboxInput from '../../../components/CheckboxInput';

const settingsIpc = window.settings;
const settingTypes = require('../../../shared/settings-values').SETTING_TYPES;

const SettingsPanel = ({ active, settingArea }) => {
    const [ settings, setSettings ] = useState({});
    
    useEffect(() => {
        (async () => {
            const returnedSettings = await settingsIpc.get(settingArea);
            setSettings({ ...returnedSettings });
        })()
    }, [ settingArea ]);

    const onSettingValueChange = async (name, value) => {
        await settingsIpc.update({ settingArea, settingName: name, newValue: value });
        const refreshedSettings = await settingsIpc.get(settingArea);
        setSettings({ ...refreshedSettings });
    };

    const generateSettingItem = (name, data, key) => {
        if (data.type === settingTypes.MULTISELECT) return (
            <MultiSelectInput
                key={key}
                name={data.display}
                value={data.value}
                onChange={value => onSettingValueChange(name, value)}
                options={data.options}
            />
        )
        if (data.type === settingTypes.BOOL) return (
            <CheckboxInput
                key={key}
                name={data.display}
                value={data.value}
                onChange={value => {onSettingValueChange(name, value)}}
            />
        )
        console.error(`Setting type ${data.type} not recognized.`);
    };
    
    return (
        <div role="tabpanel" hidden={!active}>
            <Box sx={{ p: 3 }}>
                {Object.keys(settings).map((settingName, i) => generateSettingItem(settingName, settings[settingName], i))}
            </Box>
        </div>
    )
};

export default SettingsPanel;