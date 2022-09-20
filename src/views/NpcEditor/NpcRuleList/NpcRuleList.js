import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import HorizontalRule from '@mui/icons-material/HorizontalRule';
import Add from '@mui/icons-material/Add';

const SingleInput = ({ rule, setRule, onDelete }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <IconButton onClick={onDelete} color="primary">
                    <HorizontalRule />
                </IconButton>
            }
        >
            <Grid sx={{ width: '100%' }} alignItems="center" justifyContent="center" container>
                <Grid xs={0.5} textAlign="center">
                    &#8226;
                </Grid>
                <Grid xs={11.5} textAlign="center">
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        placeholder="Loot Description"
                        value={rule}
                        onChange={e => setRule(e.target.value)}
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
};

const InputPair = ({ rule, setRule, onDelete }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <IconButton onClick={onDelete} color="primary">
                    <HorizontalRule />
                </IconButton>
            }
        >
            <Grid sx={{ width: '100%' }} alignItems="center" justifyContent="center" container>
                <Grid xs={0.5} textAlign="center">
                    &#8226;
                </Grid>
                <Grid xs={3.5} justifyContent="center">
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="Name"
                        value={rule.name}
                        onChange={e => setRule({ ...rule, name: e.target.value })}
                    />
                </Grid>
                <Grid xs={0.5} textAlign="center">
                    :
                </Grid>
                <Grid xs={7.5}>
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        placeholder="Description"
                        value={rule.description}
                        onChange={e => setRule({ ...rule, description: e.target.value })}
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
};

const SkillInput = ({ rule, setRule, onDelete }) => {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <IconButton onClick={onDelete} color="primary">
                    <HorizontalRule />
                </IconButton>
            }
        >
            <Grid sx={{ width: '100%' }} alignItems="center" justifyContent="center" container>
                <Grid xs={0.5} textAlign="center">
                    &#8226;
                </Grid>
                <Grid xs={2.5} justifyContent="center">
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="Name"
                        value={rule.name}
                        onChange={e => setRule({ ...rule, name: e.target.value })}
                    />
                </Grid>
                <Grid xs={0.5} textAlign="center">
                    :
                </Grid>
                <Grid xs={1}>
                    <TextField
                        variant="standard"
                        type="number"
                        placeholder="TN"
                        value={rule.targetNumber}
                        onChange={e =>
                            setRule({ ...rule, targetNumber: parseInt(e.target.value || 0) })
                        }
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
};

const NpcRuleList = ({ type = 'standard', name, rules, setRules }) => {
    const addRule = () =>
        setRules([
            ...rules,
            type === 'standard'
                ? { name: '', description: '' }
                : type === 'skill'
                ? { name: '', targetNumber: '' }
                : type === 'single'
                ? ''
                : null,
        ]);
    return (
        <Box>
            <Typography variant="h5" color="primary" textAlign="center">
                {name}
                <IconButton onClick={addRule}>
                    <Add fontSize="inherit" />
                </IconButton>
            </Typography>
            <List sx={{ pb: 0, pt: 0 }}>
                {rules.map((rule, ruleIndex) => {
                    if (type === 'standard') {
                        return (
                            <InputPair
                                rule={rule}
                                setRule={newRule =>
                                    setRules(
                                        rules.map((oldRule, thisRuleIndex) =>
                                            ruleIndex === thisRuleIndex ? newRule : oldRule
                                        )
                                    )
                                }
                                onDelete={() =>
                                    setRules(
                                        rules.filter(
                                            (rule, thisRuleIndex) => thisRuleIndex !== ruleIndex
                                        )
                                    )
                                }
                                key={ruleIndex}
                                ruleType={type}
                            />
                        );
                    }
                    if (type === 'skill') {
                        return (
                            <SkillInput
                                rule={rule}
                                setRule={newRule =>
                                    setRules(
                                        rules.map((oldRule, thisRuleIndex) =>
                                            ruleIndex === thisRuleIndex ? newRule : oldRule
                                        )
                                    )
                                }
                                onDelete={() =>
                                    setRules(
                                        rules.filter(
                                            (rule, thisRuleIndex) => thisRuleIndex !== ruleIndex
                                        )
                                    )
                                }
                                key={ruleIndex}
                                ruleType={type}
                            />
                        );
                    }
                    if (type === 'single') {
                        return (
                            <SingleInput
                                rule={rule}
                                setRule={newRule =>
                                    setRules(
                                        rules.map((oldRule, thisRuleIndex) =>
                                            ruleIndex === thisRuleIndex ? newRule : oldRule
                                        )
                                    )
                                }
                                onDelete={() =>
                                    setRules(
                                        rules.filter(
                                            (rule, thisRuleIndex) => thisRuleIndex !== ruleIndex
                                        )
                                    )
                                }
                                key={ruleIndex}
                                ruleType={type}
                            />
                        );
                    }
                    return null;
                })}
            </List>
        </Box>
    );
};

export default NpcRuleList;
