import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { settingItemTypes } from '../../../contextProviders/settings/values';

const settingsRepository = window.settings;


const SettingsPanel = ({ active, settingsPanelData }) => {

  return (
    <div
      role="tabpanel"
      hidden={!active}
    >
      <Box sx={{ p: 3 }}>
        {settingsPanelData.settingItems.map((settingItem) => {
          switch (settingItem.type) {
            case settingItemTypes.ENUM:
              return (
                <Stack key={settingItem.id} direction="row" spacing={2}>
                  <Typography variant="subtitle1">{settingItem.displayName}</Typography>
                  <Select
                    value={settingItem.values.find(valueObject => valueObject.selected === true).name}
                    variant="standard"
                    onChange={e => updateSettingItem(settingsPanelData.id, { ...settingItem, values: settingItem.values.map(settingValue => (
                      settingValue.name === e.target.value ?
                        { name: settingValue.name, selected: true } :
                        { name: settingValue.name, selected: false }
                    ))})}
                  >
                    {settingItem.values.map(valueObject => (
                      <MenuItem
                        key={valueObject.name}
                        value={valueObject.name}
                      >
                        {valueObject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              );
            case settingItemTypes.BOOL:
              return (
                <Stack key={settingItem.id} direction="row" spacing={2}>
                  <Typography variant="subtitle1">{settingItem.displayName}</Typography>
                  <Checkbox checked={settingItem.value} onChange={e => updateSettingItem(settingsPanelData.id, { ...settingItem, value: e.target.checked })} />
                </Stack>
              );
            default:
              console.error(`Setting Item Type "${settingItem.type}" not recognized.`)
              return null;
          }
        })}
      </Box>
    </div>
  )
};

export default SettingsPanel;