import React, { useContext, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import Circle from '@mui/icons-material/Circle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import MoreVert from '@mui/icons-material/MoreVert'

import { useTheme } from '@mui/material/styles';

import { CombatantContext } from '../../../contextProviders/combatant';
import { combatantStatuses, combatantTypes } from '../../../contextProviders/combatant/values';

import classes from './CombatantListing.module.css';

const CombatantListing = ({ combatant, combatState }) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);

  const {
    editCombatant,
    deleteCombatant
  } = useContext(CombatantContext);

  const theme = useTheme();

  const activePlayerStyle = { backgroundColor: theme.palette.primary.main + '33' };

  const handleHitPointsClick = e => {
    setPopoverAnchorEl(e.currentTarget);
  };

  const handleMoreMenuClick = e => {
    setMoreMenuAnchorEl(e.currentTarget);
  };

  const handleHitPointsChange = e => {
    if (e.target.value == null || e.target.value === '') return editCombatant({ ...combatant, currentHitPoints: 0 });
    if (e.target.value > combatant.maxHitPoints || e.target.value === 0) return;
    editCombatant({ ...combatant, currentHitPoints: e.target.value });
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const renderPointTracker = (current, max, name) => {
    const rendered = [];
    for (let i = 0; i < max; i++) {
      if (i < current) {
        rendered.push(<Circle key={`${name}-${i}`} fontSize="small" />);
        continue;
      }
      rendered.push(<RadioButtonUnchecked key={`${name}-${i}`} fontSize="small" />);
    }
    if (rendered.length === 0) rendered.push(<Typography key={`${name}-0`} component="span">--</Typography>);
    return rendered;
  };

  const handleActionPointsClick = e => {
    switch (e.type) {
      case 'contextmenu':
        if (combatant.currentActionPoints !== combatant.maxActionPoints)
          editCombatant({ ...combatant, currentActionPoints: combatant.currentActionPoints + 1 });
        break;
      case 'click':
        if (combatant.currentActionPoints !== 0)
          editCombatant({ ...combatant, currentActionPoints: combatant.currentActionPoints - 1 });
        break;
    }
  };

  const handleLuckPointsClick = e => {
    switch (e.type) {
      case 'contextmenu':
        if (combatant.currentLuckPoints !== combatant.luckBonus)
          editCombatant({ ...combatant, currentLuckPoints: combatant.currentLuckPoints + 1 });
        break;
      case 'click':
        if (combatant.currentLuckPoints !== 0)
          editCombatant({ ...combatant, currentLuckPoints: combatant.currentLuckPoints - 1 });
        break;
    }
  };
  
  return (
    <TableRow
      className={classes.CombatantListing}
      style={combatState.activeCombatantId === combatant.id ? activePlayerStyle : null}
    >
      <TableCell align="left">{combatant.type === combatantTypes.PC ? <PeopleAlt fontSize="small" /> : null}</TableCell>
      <TableCell align="left"><Typography component="span">{combatant.name}</Typography></TableCell>      
      <TableCell align="left"><Typography component="span">{combatant.initiativeRating}</Typography></TableCell>
      <TableCell align="center">
        <Stack direction="row" justifyContent="center">
          <IconButton
            size="small"
            color="error"
            disabled={combatant.currentHitPoints === 0}
            onClick={() => editCombatant({ ...combatant, currentHitPoints: combatant.currentHitPoints - 1 })}
          >
            <Remove />
          </IconButton>
          <Button
            size="small"
            color="secondary"
            onClick={handleHitPointsClick}
          >
            <Typography component="span">
              {combatant.currentHitPoints} / {combatant.maxHitPoints}
            </Typography>
          </Button>
          <Popover
            open={Boolean(popoverAnchorEl)}
            anchorEl={popoverAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <TextField
              sx={{ margin: theme.spacing(1), width: '50px' }}
              size="small"
              variant="standard"
              type="number"
              value={combatant.currentHitPoints}
              onChange={handleHitPointsChange}
              inputProps={{ style: { textAlign: 'center' } }}
              onKeyPress={e => e.key === 'Enter' || e.key === "NumpadEnter" ? handlePopoverClose() : null}
              autoFocus
            />
          </Popover>
          <IconButton
            size="small"
            color="success"
            disabled={combatant.currentHitPoints === combatant.maxHitPoints}
            onClick={() => editCombatant({ ...combatant, currentHitPoints: combatant.currentHitPoints + 1 })}
          >
            <Add />
          </IconButton>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="success"
          onClick={handleLuckPointsClick}
          onContextMenu={handleLuckPointsClick}
          disabled={combatant.luckBonus === 0}
        >
          {renderPointTracker(combatant.currentLuckPoints, combatant.luckBonus, 'luckpoints')}
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="primary"
          onClick={handleActionPointsClick}
          onContextMenu={handleActionPointsClick}
          disabled={combatant.maxActionPoints === 0}
        >
          {renderPointTracker(combatant.currentActionPoints, combatant.maxActionPoints, 'actionpoints')}
        </Button>
      </TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          color="secondary"
          onClick={handleMoreMenuClick}
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={moreMenuAnchorEl}
          open={Boolean(moreMenuAnchorEl)}
          onClose={() => setMoreMenuAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={() => editCombatant({ ...combatant, status: combatantStatuses.EDITING })}>Edit</MenuItem>
          <MenuItem onClick={() => deleteCombatant(combatant)}>Delete</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
};

export default CombatantListing;