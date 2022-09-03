import React, { useContext } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Check from '@mui/icons-material/Check';
import DeleteForever from '@mui/icons-material/DeleteForever';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

import { styled } from '@mui/material/styles';

import { CombatContext } from '../../contextProviders/combat';
import { combatantTypes, combatantColors } from '../../contextProviders/combat/values';

const NewCombatantContainer = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    textAlign: 'center',
}));

const CharacterInputField = styled(TextField)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    textAlign: 'center',
}));

const InteractionButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const NewCombatant = ({ newCombatant }) => {
    const { editCombatant, commitCombatant, deleteCombatant } = useContext(CombatContext);

    const keyPress = e => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') commitCombatant(newCombatant);
    };
    return (
        <Box component={NewCombatantContainer} onKeyPress={keyPress} style={{ margin: '0 10%' }}>
            <Stack direction="row" justifyContent="space-between">
                <Select
                    id="newCombatant.type"
                    label="Type"
                    variant="standard"
                    value={newCombatant.type}
                    onChange={e => editCombatant({ ...newCombatant, type: e.target.value })}
                    MenuProps={{ style: { maxHeight: '10em' } }}
                    sx={{ml: 2}}
                >
                    {Object.entries(combatantTypes).map(([key, value]) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
                <CharacterInputField
                    id="newCombatant.name"
                    label="Name"
                    variant="standard"
                    value={newCombatant.name}
                    onChange={e => editCombatant({ ...newCombatant, name: e.target.value })}
                    autoFocus
                />
                {newCombatant.type === combatantTypes.NPC ? (
                    <Select
                        id="newCombatant.color"
                        label="Color"
                        variant="standard"
                        value={newCombatant.color || ''}
                        onChange={e => editCombatant({ ...newCombatant, color: e.target.value })}
                        MenuProps={{ style: { maxHeight: '10em' } }}
                    >
                        <MenuItem value={null}>None</MenuItem>
                        {combatantColors.map(color => (
                            <MenuItem key={color} value={color}>
                                <SquareRoundedIcon fontSize="small" htmlColor={color} />
                            </MenuItem>
                        ))}
                    </Select>
                ) : null}
                <CharacterInputField
                    id="newCombatant.maxHitPoints"
                    label="HP"
                    variant="standard"
                    type="number"
                    value={newCombatant.maxHitPoints}
                    onChange={e =>
                        editCombatant({
                            ...newCombatant,
                            maxHitPoints: e.target.value,
                            currentHitPoints: e.target.value,
                        })
                    }
                />
                <CharacterInputField
                    id="newCombatant.maxMagicka"
                    label="MP"
                    variant="standard"
                    type="number"
                    value={newCombatant.maxMagicka}
                    onChange={e =>
                        editCombatant({
                            ...newCombatant,
                            maxMagicka: e.target.value,
                            currentMagicka: e.target.value,
                        })
                    }
                />
                <CharacterInputField
                    id="newCombatant.staminaPoints"
                    label="SP"
                    variant="standard"
                    type="number"
                    value={newCombatant.maxStaminaPoints}
                    onChange={e =>
                        editCombatant({
                            ...newCombatant,
                            maxStaminaPoints: e.target.value,
                            currentStaminaPoints: e.target.value,
                        })
                    }
                />
                <CharacterInputField
                    id="newCombatant.actionPoints"
                    label="AP"
                    variant="standard"
                    type="number"
                    value={newCombatant.maxActionPoints}
                    onChange={e =>
                        editCombatant({
                            ...newCombatant,
                            maxActionPoints: e.target.value,
                            currentActionPoints: e.target.value,
                        })
                    }
                />
                <CharacterInputField
                    id="newCombatant.initiativeRating"
                    label="IR"
                    variant="standard"
                    type="number"
                    value={newCombatant.initiativeRating}
                    onChange={e =>
                        editCombatant({ ...newCombatant, initiativeRating: e.target.value })
                    }
                />
                {newCombatant.type === combatantTypes.PC ? (
                    <CharacterInputField
                        id="newCombatant.luckBonus"
                        label="LB"
                        variant="standard"
                        type="number"
                        value={newCombatant.luckBonus}
                        onChange={e =>
                            editCombatant({
                                ...newCombatant,
                                luckBonus: e.target.value,
                                currentLuckPoints: e.target.value,
                            })
                        }
                    />
                ) : null}
                <InteractionButtonGroup>
                    <Button onClick={() => deleteCombatant({ id: newCombatant.id })}>
                        <DeleteForever />
                    </Button>
                    <Button onClick={() => commitCombatant({ id: newCombatant.id })}>
                        <Check />
                    </Button>
                </InteractionButtonGroup>
            </Stack>
        </Box>
    );
};

export default NewCombatant;
