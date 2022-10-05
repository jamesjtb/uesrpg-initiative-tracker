import React, { useState, useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Add from '@mui/icons-material/Add';

import NpcActions from '../NpcActions/NpcActions';

import { openChildWindow } from '../../../util/utils';
const NpcVariantMenu = ({ parentId }) => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const [variants, setVariants] = useState([]);

    const getVariants = useCallback(async () => {
        const variantResult = await window.bestiary.get({ parentId }, { name: 1 });
        setVariants([...variantResult]);
    }, [setVariants, parentId]);

    useEffect(() => {
        getVariants();
    }, [getVariants]);

    window.bestiary.onUpdate(() => getVariants());

    const onAddNewVariantClick = () => {
        openChildWindow(`views/npceditor/variant/${parentId}`, {
            modal: true,
        });
        setAnchor(null);
    };

    return (
        <>
            <Button
                size="small"
                endIcon={<KeyboardArrowDownIcon size="inherit" />}
                onClick={e => setAnchor(e.currentTarget)}
            >
                VARIANTS ({variants.length || 'NONE'})
            </Button>
            <Popover anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
                <List>
                    {variants.map(variant => (
                        <ListItem key={variant._id}>
                            <Grid container>
                                <Grid xs="auto"><Typography>{variant.name}</Typography></Grid>
                                <Grid><NpcActions npc={variant} /></Grid>                                
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <MenuItem onClick={onAddNewVariantClick}>
                    Add New Variant <Add />
                </MenuItem>
            </Popover>
        </>
    );
};

export default NpcVariantMenu;
