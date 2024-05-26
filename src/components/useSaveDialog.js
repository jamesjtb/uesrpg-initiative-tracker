import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const createPromise = () => {
    let resolver;
    return [
        new Promise((resolve, reject) => {
            resolver = resolve;
        }),
        resolver,
    ];
};

const useSaveDialog = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [resolver, setResolver] = useState({ resolve: null });
    const [documentType, setDocumentType] = useState('');

    const getSaveName = async documentType => {
        setDocumentType(documentType);
        setOpen(true);
        const [promise, resolve] = createPromise();
        setResolver({ resolve });
        return promise;
    };

    const onSave = async () => {
        setOpen(false);
        resolver.resolve(name);
    };

    const SaveDialog = () => (
        <Dialog open={open}>
            <DialogTitle>Save {documentType}</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    label={`${documentType} Name`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );

    return [getSaveName, SaveDialog];
};

export default useSaveDialog;
