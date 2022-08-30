import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import SettingsPanel from './SettingsPanel';

const settingsIpc = window.settings;

const SettingsModal = ({ open, setOpen }) => {
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ settingAreas, setsettingAreas ] = useState([]);

    useEffect(() => {
        (async() => {
            const settingAreas = await settingsIpc.getAreas();
            setsettingAreas([...settingAreas]);
        })();
    }, []);

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

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <Typography variant="h4" color="primary">Settings</Typography>
                <Divider />
                <Tabs value={currentTab} onChange={(e, newTab) => setCurrentTab(newTab)}>
                    {settingAreas.map((settingArea, i) => <Tab label={settingArea} value={i} key={i} />)}
                </Tabs>
                {settingAreas.map((settingArea, i) => <SettingsPanel active={i === currentTab} settingArea={settingArea} key={i} />)}
                <Grid container justifyContent="flex-end">
                    <Button color="secondary" variant="contained" onClick={e => setOpen(false)}>Done</Button>
                </Grid>
            </Box>
        </Modal>
    )
};

export default SettingsModal;
