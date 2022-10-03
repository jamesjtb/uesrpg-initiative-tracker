import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const createPromise = () => {
    let resolver;
    return [new Promise((resolve, reject) => {
        resolver = resolve;
    }), resolver]
};

const useConfirmation = () => {
    const [open, setOpen] = useState(false);
    const [resolver, setResolver] = useState({ resolve: null });
    const [label, setLabel] = useState('');

    const getConfirmation = async message => {
        setLabel(message);
        setOpen(true);
        const [ promise, resolve ] = await createPromise();
        setResolver({ resolve });
        return promise;
    };

    const onClick = async status => {
        setOpen(false);
        resolver.resolve(status);
    }

    const Confirmation = () => (
        <Dialog open={open}>
            <DialogContent>
                {label}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClick(false)}>Cancel</Button>
                <Button onClick={() => onClick(true)}>Okay</Button>
            </DialogActions>
        </Dialog>
    );

    return [ getConfirmation, Confirmation ];
};

export default useConfirmation;
