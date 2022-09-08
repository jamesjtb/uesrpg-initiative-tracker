import React, { useEffect, useState, useCallback } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import GitHubApiRepository from '../../util/github-client';

const updateStates = {
    STARTUP: 'STARTUP',
    CHECKING: 'CHECKING',
    OUTDATED: 'OUTDATED',
    CURRENT: 'CURRENT',
    DORMANT: 'DORMANT',
};

const settingsIpc = window.settings;
const appIpc = window.app;

const Updater = ({ triggerUpdate, onUpdateComplete }) => {
    const [updateState, setUpdateState] = useState(updateStates.STARTUP);
    const [isOpen, setIsOpen] = useState(false);
    const [latestRelease, setLatestRelease] = useState({ tag: null, url: null });

    const getLatestRelease = useCallback(async () => {
        const gitHubApiRepository = new GitHubApiRepository();
        const latestRelease = await gitHubApiRepository.getLatestRelease();
        return { tag: latestRelease?.tag_name, url: latestRelease?.html_url };
    }, []);

    const handleClose = () => {
        setUpdateState(updateStates.DORMANT);
        setIsOpen(false);
    };

    useEffect(() => {
        (async () => {
            if (updateState === updateStates.STARTUP || (triggerUpdate && updateState === updateStates.DORMANT)) {
                const returnedSettings = await settingsIpc.get('general');
                if (returnedSettings.checkForUpdates.value) {
                    setUpdateState(updateStates.CHECKING);
                    setIsOpen(true);
                    return;                    
                }
                setUpdateState(updateStates.DORMANT);
                return;
            }

            if (updateState === updateStates.CHECKING) {
                const latest = await getLatestRelease();
                const localVersion = await appIpc.getVersion();
                if (`v${localVersion}` === latest.tag) {
                    setUpdateState(updateStates.CURRENT);
                } else {                    
                    setLatestRelease(latest);
                    setUpdateState(updateStates.OUTDATED);
                }
                onUpdateComplete();
                return;
            }
        })();
    }, [ updateState, getLatestRelease, triggerUpdate, onUpdateComplete ]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={updateState === updateStates.CURRENT ? 10000 : null}
            onClose={(e, reason) => {
                if (reason !== 'clickaway') handleClose();
            }}
        >
            {updateState === updateStates.CHECKING ? (
                <Alert severity={'info'}>
                    <Typography component="span" sx={{ marginRight: '1em' }}>
                        Checking for updates...
                    </Typography>
                    <CircularProgress size="1em" />
                </Alert>
            ) : updateState === updateStates.CURRENT ? (
                <Alert severity="success" onClose={handleClose}>
                    <Typography component="span">Up to Date</Typography>
                </Alert>
            ) : updateState === updateStates.OUTDATED ? (
                <Alert severity="warning" onClose={handleClose}>
                    <Typography>
                        Local version out of date. Latest Version:{' '}
                        <Link sx={{ cursor: 'pointer' }} onClick={() => window.system.openInBrowser(latestRelease.url)}>
                            {latestRelease.tag}
                        </Link>
                    </Typography>
                </Alert>
            ) : null}
        </Snackbar>
    );
};

export default Updater;
