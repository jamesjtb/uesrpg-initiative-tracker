import React, {useState} from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { StyledTableCell } from '../../../components/StyledComponents/TableCell';

const sizes = [
    "Puny",
    "Tiny",
    "Small",
    "Standard",
    "Large",
    "Huge",
    "Enormous",
];

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
                    <Select
                        value={value}
                        variant="standard"
                        onChange={onChange}
                    >
                        {sizes.map(option => (
                            <MenuItem
                                key={option}
                                value={option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : null}
            </StyledTableCell>
        </>
    );
};

const StatTable = () => {
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
                    <StatPair displayName="Strength" value={60} onChange={() => console.log(60)} />
                    <StatPair
                        displayName="Hit Points"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="Combat" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair displayName="Endurance" value={60} onChange={() => console.log(60)} />
                    <StatPair
                        displayName="Wound Threshold"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="Magic" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair displayName="Agility" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Magicka" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Evade" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Intelligence"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="Stamina" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Observe" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair displayName="Willpower" value={60} onChange={() => console.log(60)} />
                    <StatPair
                        displayName="Initiative"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="Stealth" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Perception"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="AP" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Knowledge" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair
                        displayName="Personality"
                        value={60}
                        onChange={() => console.log(60)}
                    />
                    <StatPair displayName="Speed" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Social" value={60} onChange={() => console.log(60)} />
                </TableRow>
                <TableRow>
                    <StatPair displayName="Luck" value={60} onChange={() => console.log(60)} />
                    <StatPair displayName="Size" value="Standard" onChange={() => console.log(60)} inputType="size" />
                    <StatPair displayName="Physical" value={60} onChange={() => console.log(60)} />
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default StatTable;
