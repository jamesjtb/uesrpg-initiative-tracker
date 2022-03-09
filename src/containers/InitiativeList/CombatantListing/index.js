import React, { useContext, useEffect, useState } from 'react';

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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import Circle from '@mui/icons-material/Circle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import MoreVert from '@mui/icons-material/MoreVert';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';

import { useTheme, styled } from '@mui/material/styles';

import { CombatContext } from '../../../contextProviders/combat';
import { combatantStatuses, combatantTypes } from '../../../contextProviders/combat/values';

import classes from './CombatantListing.module.css';

const CompactTableCell = styled(TableCell)(({ theme }) => ({
  padding: `0 ${theme.spacing(0.5)}`
}));

const CombatantListing = ({ combatant, combatState }) => {
  const [hitpointPopoverAnchorEl, setHitpointsPopoverAnchorEl] = useState(null);
  const [magickaPopoverAnchorEl, setMagickaPopoverAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [editingTempHP, setEditingTempHP] = useState(false);
  
  useEffect(() => {
    if (combatant.tempHitPoints === 0) setEditingTempHP(false);
  }, [combatant.tempHitPoints])

  const {
    editCombatant,
    deleteCombatant,
    duplicateCombatant
  } = useContext(CombatContext);

  const theme = useTheme();

  const activePlayerStyle = { backgroundColor: theme.palette.primary.main + '33' };

  const handleHitPointsClick = e => {
    setHitpointsPopoverAnchorEl(e.currentTarget);
  };

  const handleMagickaClick = e => {
    setMagickaPopoverAnchorEl(e.currentTarget);
  }

  const handleMoreMenuClick = e => {
    setMoreMenuAnchorEl(e.currentTarget);
  };

  const handleHitPointsChange = e => {
    if (e.target.value == null || e.target.value === '') return editCombatant({ ...combatant, currentHitPoints: 0 });
    if (e.target.value > combatant.maxHitPoints || e.target.value === 0) return;
    editCombatant({ ...combatant, currentHitPoints: e.target.value });
  };

  const handleMagickaChange = e => {
    if (e.target.value == null || e.target.value === '') return editCombatant({ ...combatant, currentMagicka: 0 });
    if (e.target.value > combatant.maxMagicka || e.target.value === 0) return;
    editCombatant({ ...combatant, currentMagicka: e.target.value });
  };

  const handleHitpointsPopoverClose = () => {
    setHitpointsPopoverAnchorEl(null);
  };

  const handleMagickaPopoverClose = () => {
    setMagickaPopoverAnchorEl(null);
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

  const handleStaminaPointsClick = e => {
    switch (e.type) {
      case 'contextmenu':
        if (combatant.currentStaminaPoints !== combatant.maxStaminaPoints)
          editCombatant({ ...combatant, currentStaminaPoints: combatant.currentStaminaPoints + 1 });
        break;
      case 'click':
        if (combatant.currentStaminaPoints !== 0)
          editCombatant({ ...combatant, currentStaminaPoints: combatant.currentStaminaPoints - 1 });
        break;
    }
  }

  return (
    <TableRow
      className={classes.CombatantListing}
      style={combatState.activeCombatantId === combatant.id ? activePlayerStyle : null}
    >
      {/* PC Indicator */}
      <CompactTableCell align="left">{combatant.type === combatantTypes.PC ? <PeopleAlt fontSize="small" /> : null}</CompactTableCell>
      {/* Name */}
      <CompactTableCell align="left"><Typography component="span">{combatant.name}</Typography></CompactTableCell>
      {/* Hit Points */}
      <CompactTableCell align="center">
        <Stack direction="row" justifyContent="center">
          <IconButton
            size="small"
            color="error"
            disabled={combatant.currentHitPoints === 0}
            onClick={() => {
              combatant.tempHitPoints > 0 ?
                editCombatant({ ...combatant, tempHitPoints: combatant.tempHitPoints - 1 }) :
                editCombatant({ ...combatant, currentHitPoints: combatant.currentHitPoints - 1 })
            }}
          >
            <Remove />
          </IconButton>
          <Button
            size="small"
            color="secondary"
            onClick={handleHitPointsClick}
          >
            <Typography component="span">
              {combatant.currentHitPoints} {combatant.tempHitPoints > 0 ? `+ ${combatant.tempHitPoints}` : null} / {combatant.maxHitPoints}
            </Typography>
          </Button>
          <Popover
            open={Boolean(hitpointPopoverAnchorEl)}
            PaperProps={{ style: { padding: theme.spacing(1) } }}
            anchorEl={hitpointPopoverAnchorEl}
            onClose={handleHitpointsPopoverClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <TextField
              sx={{ width: '50px', paddingRight: theme.spacing(1) }}
              variant="standard"
              type="number"
              value={combatant.currentHitPoints}
              label="hitpoints"
              onChange={handleHitPointsChange}
              inputProps={{ style: { textAlign: 'center' } }}
              onKeyPress={e => e.key === 'Enter' || e.key === "NumpadEnter" ? handleHitpointsPopoverClose() : null}
              autoFocus
            />
            {editingTempHP ?
              <TextField
                sx={{ width: '50px' }}
                variant="standard"
                label="temp hp"
                type="number"
                value={combatant.tempHitPoints}
                onChange={e => editCombatant({ ...combatant, tempHitPoints: e.target.value < 0 ? 0 : e.target.value })}
                onKeyPress={e => e.key === 'Enter' || e.key === 'NumpadEnter' ? handleHitpointsPopoverClose() : null}
                autoFocus
              /> :
              <Tooltip title="Add Temporary HP">
                <IconButton color="primary" onClick={() => setEditingTempHP(true)}><Add fontSize="small" /></IconButton>
              </Tooltip>
            }
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
      </CompactTableCell>
      {/* Luck Points */}
      <CompactTableCell align="center">
        <Tooltip title="Click to use, left click to replenish." enterDelay={700} leaveDelay={200} disableInteractive>
          <Button
            size="small"
            color="success"
            onClick={handleLuckPointsClick}
            onContextMenu={handleLuckPointsClick}
            disabled={combatant.luckBonus === 0}
          >
            {renderPointTracker(combatant.currentLuckPoints, combatant.luckBonus, 'luckpoints')}
          </Button>
        </Tooltip>
      </CompactTableCell>
      {/* Magicka Points */}
      <CompactTableCell align="center">
        <Stack direction="row" justifyContent="center">
          <IconButton
            size="small"
            color="error"
            disabled={combatant.currentMagicka === 0}
            onClick={() => editCombatant({ ...combatant, currentMagicka: combatant.currentMagicka - 1 })}
          >
            <Remove />
          </IconButton>
          <Button
            size="small"
            color="secondary"
            onClick={handleMagickaClick}
          >
            <Typography component="span">
              {combatant.currentMagicka} / {combatant.maxMagicka}
            </Typography>
          </Button>
          <Popover
            open={Boolean(magickaPopoverAnchorEl)}
            PaperProps={{ style: { padding: theme.spacing(1) } }}
            anchorEl={magickaPopoverAnchorEl}
            onClose={handleMagickaPopoverClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <TextField
              sx={{ width: '50px', paddingRight: theme.spacing(1) }}
              variant="standard"
              type="number"
              value={combatant.currentMagicka}
              label="hitpoints"
              onChange={handleMagickaChange}
              inputProps={{ style: { textAlign: 'center' } }}
              onKeyPress={e => e.key === 'Enter' || e.key === "NumpadEnter" ? handleMagickaPopoverClose() : null}
              autoFocus
            />
          </Popover>
          <IconButton
            size="small"
            color="success"
            disabled={combatant.currentMagicka === combatant.maxMagicka}
            onClick={() => editCombatant({ ...combatant, currentMagicka: combatant.currentMagicka + 1 })}
          >
            <Add />
          </IconButton>
        </Stack>
      </CompactTableCell>
      {/* Stamina Points */}
      <CompactTableCell align="center">
        <Tooltip title="Click to use, left click to replenish." enterDelay={700} leaveDelay={200} disableInteractive>
          <Button
            size="small"
            color="secondary"
            onClick={handleStaminaPointsClick}
            onContextMenu={handleStaminaPointsClick}
            disabled={combatant.maxStaminaPoints === 0}
          >
            {renderPointTracker(combatant.currentStaminaPoints, combatant.maxStaminaPoints, 'actionpoints')}
          </Button>
        </Tooltip>
      </CompactTableCell>
      {/* Action Points */}
      <CompactTableCell align="center">
        <Tooltip title="Click to use, left click to replenish." enterDelay={700} leaveDelay={200} disableInteractive>
          <Button
            size="small"
            color="primary"
            onClick={handleActionPointsClick}
            onContextMenu={handleActionPointsClick}
            disabled={combatant.maxActionPoints === 0}
          >
            {renderPointTracker(combatant.currentActionPoints, combatant.maxActionPoints, 'actionpoints')}
          </Button>
        </Tooltip>
      </CompactTableCell>
      {/* More Menu */}
      <CompactTableCell align="right">
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
          <MenuItem onClick={() => editCombatant({ ...combatant, status: combatantStatuses.EDITING })}>
            <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => duplicateCombatant(combatant)}>
            <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => deleteCombatant(combatant)}>
            <ListItemIcon><DeleteForever color="error" fontSize="small" /></ListItemIcon>
            <ListItemText><Typography color="error">Delete</Typography></ListItemText>  
          </MenuItem>
        </Menu>
      </CompactTableCell>
    </TableRow>
  )
};

export default CombatantListing;