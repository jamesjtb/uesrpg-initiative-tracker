import React, { useContext, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { SettingsContext } from '../../contextProviders/settings';
import SettingsPanel from './SettingsPanel';

const SettingsModal = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabChange = (e, newTab) => {
    setCurrentTab(newTab);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const { settingsState, setSettingsModalOpen } = useContext(SettingsContext);
  return (settingsState.modal.open ?
    <Modal
      open={settingsState.modal.open}
      onClose={() => setSettingsModalOpen(false)}
    >
      <Box sx={style}>
        <Typography variant="h4" color="primary">Settings</Typography>
        <Divider />
        <Tabs value={currentTab} onChange={tabChange}>
          {(() => {
            const tabsToRender = []
            // Render the tabs in position order, since things get jumbled as we update
            for (let i = 0; i < settingsState.userSettings.length; i++) {
              const tabData = settingsState.userSettings.find(settingsTab => settingsTab.id === i);
              tabsToRender.push(<Tab label={tabData.displayName} value={tabData.id} key={tabData.id} />)
            }
            return tabsToRender;
          })()}
        </Tabs>
        {settingsState.userSettings.map(settingsPanelData => (
          <SettingsPanel settingsPanelData={settingsPanelData} active={currentTab === settingsPanelData.id} key={settingsPanelData.id} />
        ))}
        <Grid container justifyContent="flex-end">
          <Button color="secondary" variant="contained" onClick={e => setSettingsModalOpen(false)}>Done</Button>
        </Grid>
      </Box>
    </Modal>
    : null
  );
};

export default SettingsModal;