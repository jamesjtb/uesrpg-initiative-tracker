import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

const sizes = ['Puny', 'Tiny', 'Small', 'Standard', 'Large', 'Huge', 'Enormous'];

const StatPair = ({ displayName, value, onChange, align = 'center', inputType = 'score' }) => {
    return (
        <>
            <StyledTableCell align={align}>
                <Typography component="span">{displayName}</Typography>
            </StyledTableCell>
            <StyledTableCell align={align}>
                {inputType === 'score' ? (
                    <TextField
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                    width: '4rem',
                                },
                            },
                        }}
                        variant="standard"
                        value={value}
                        onChange={onChange}
                        type="number"
                        size="small"
                    />
                ) : inputType === 'size' ? (
                    <Select value={value} variant="standard" onChange={onChange}>
                        {sizes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : null}
            </StyledTableCell>
        </>
    );
};

const StatTable = ({ stats, setStats }) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Characteristics</StyledTableCell>
                    <StyledTableCell align="center" />
                    <StyledTableCell align="center">Attributes</StyledTableCell>
                    <StyledTableCell align="center" />
                    <StyledTableCell align="center">Proficiencies</StyledTableCell>
                    <StyledTableCell align="center" />
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <StatPair
                        displayName="Strength"
                        value={stats.strength}
                        onChange={e =>
                            setStats({ ...stats, strength: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Hit Points"
                        value={stats.hitPoints}
                        onChange={e =>
                            setStats({ ...stats, hitPoints: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Combat"
                        value={stats.combat}
                        onChange={e =>
                            setStats({ ...stats, combat: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Endurance"
                        value={stats.endurance}
                        onChange={e =>
                            setStats({ ...stats, endurance: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Wound Threshold"
                        value={stats.woundThreshold}
                        onChange={e =>
                            setStats({ ...stats, woundThreshold: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Magic"
                        value={stats.magic}
                        onChange={e => setStats({ ...stats, magic: parseInt(e.target.value || 0) })}
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Agility"
                        value={stats.agility}
                        onChange={e =>
                            setStats({ ...stats, agility: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Magicka"
                        value={stats.magicka}
                        onChange={e =>
                            setStats({ ...stats, magicka: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Evade"
                        value={stats.evade}
                        onChange={e => setStats({ ...stats, evade: parseInt(e.target.value || 0) })}
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Intelligence"
                        value={stats.intelligence}
                        onChange={e =>
                            setStats({ ...stats, intelligence: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Stamina"
                        value={stats.stamina}
                        onChange={e =>
                            setStats({ ...stats, stamina: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Observe"
                        value={stats.observe}
                        onChange={e =>
                            setStats({ ...stats, observe: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Willpower"
                        value={stats.willpower}
                        onChange={e =>
                            setStats({ ...stats, willpower: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Initiative"
                        value={stats.initiative}
                        onChange={e =>
                            setStats({ ...stats, initiative: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Stealth"
                        value={stats.stealth}
                        onChange={e =>
                            setStats({ ...stats, stealth: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Perception"
                        value={stats.perception}
                        onChange={e =>
                            setStats({ ...stats, perception: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="AP"
                        value={stats.actionPoints}
                        onChange={e =>
                            setStats({ ...stats, actionPoints: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Knowledge"
                        value={stats.knowledge}
                        onChange={e =>
                            setStats({ ...stats, knowledge: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Personality"
                        value={stats.personality}
                        onChange={e =>
                            setStats({ ...stats, personality: parseInt(e.target.value || 0) })
                        }
                    />
                    <StatPair
                        displayName="Speed"
                        value={stats.speed}
                        onChange={e => setStats({ ...stats, speed: parseInt(e.target.value || 0) })}
                    />
                    <StatPair
                        displayName="Social"
                        value={stats.social}
                        onChange={e =>
                            setStats({ ...stats, social: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Luck"
                        value={stats.luck}
                        onChange={e => setStats({ ...stats, luck: parseInt(e.target.value || 0) })}
                    />
                    <StatPair
                        displayName="Size"
                        value={stats.size}
                        onChange={e => setStats({ ...stats, size: e.target.value })}
                        inputType="size"
                    />
                    <StatPair
                        displayName="Physical"
                        value={stats.physical}
                        onChange={e =>
                            setStats({ ...stats, physical: parseInt(e.target.value || 0) })
                        }
                    />
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default StatTable;
