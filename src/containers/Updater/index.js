import React, { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import GitHubApiRepository from '../../util/github-client';

const updateStates = {
    STARTUP: 'STARTUP',
    INITIALIZING: 'INITIALIZING',
    CHECKING: 'CHECKING',
    OUTDATED: 'OUTDATED',
    CURRENT: 'CURRENT',
    DISABLED: 'DISABLED',
};

const settingsIpc = window.settings;
const appIpc = window.app;

const Updater = () => {
    const [latestVersion, setLatestVersion] = useState({ tag: null, url: null });
    const [checkForUpdatesValue, setCheckForUpdatesValue] = useState(null);
    const [updateState, setUpdateState] = useState(updateStates.STARTUP);
    const [isOpen, setIsOpen] = useState(false);

    const checkForUpdates = async () => {
        const gitHubApiRepository = new GitHubApiRepository();
        const latestRelease = await gitHubApiRepository.getLatestRelease();
        setLatestVersion({ tag: latestRelease?.tag_name, url: latestRelease?.html_url });
    };

    useEffect(() => {
        (async () => {
            if (updateState === updateStates.STARTUP) {
                setUpdateState(updateState.INITIALIZING);
                const returnedSettings = await settingsIpc.get('general');
                setCheckForUpdatesValue(returnedSettings.checkForUpdates.value);
                return;
            }
        })();
    }, [updateState, setUpdateState]);

    useEffect(() => {
        if (checkForUpdatesValue === true) {
            setUpdateState(updateStates.CHECKING);
            setIsOpen(true);
            checkForUpdates();
            return;
        }
        setUpdateState(updateStates.DISABLED);
    }, [ checkForUpdatesValue, setUpdateState ]);

    useEffect(() => {
        (async () => {
            if (latestVersion.tag && updateState === updateStates.CHECKING) {
                const localVersion = await appIpc.getVersion();
                if (`v${localVersion}` === latestVersion.tag) {
                    setUpdateState(updateStates.CURRENT);
                    return;
                }
                setUpdateState(updateStates.OUTDATED);
            }
        })();
    }, [latestVersion, updateState]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={updateState === updateStates.CURRENT ? 10000 : null}
            onClose={(e, reason) => {
                if (reason !== 'clickaway') setIsOpen(false);
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
                <Alert severity="success" onClose={() => setIsOpen(false)}>
                    <Typography component="span">
                        Up to Date
                    </Typography>
                </Alert>
            ): updateState === updateStates.OUTDATED ? (
                <Alert severity="warning" onClose={() => setIsOpen(false)}>
                    <Typography>
                        Local verison out of date. Latest Version: <a href={latestVersion.url} target="_blank" rel="noreferrer">{latestVersion.tag}</a>
                    </Typography>
                </Alert>
            ) : null}
        </Snackbar>
    );
};

export default Updater;
