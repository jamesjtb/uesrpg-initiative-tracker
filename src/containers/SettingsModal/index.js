import React, { useContext } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SettingsContext } from '../../contextProviders/settings';

const SettingsModal = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '410px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const { settingsState, setSettingsModalOpen } = useContext(SettingsContext);
  return (
    <Modal
      open={settingsState.modal.open}
      onClose={() => setSettingsModalOpen(false)}
    >
      <Box sx={style}>
        <Typography>Settings</Typography>
      </Box>
    </Modal>
  );
};

export default SettingsModal;