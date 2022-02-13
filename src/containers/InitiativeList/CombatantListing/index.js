import React, { useContext, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import Circle from '@mui/icons-material/Circle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';

import { useTheme } from '@mui/material/styles';

import { CombatantContext } from '../../../contextProviders/combatant';

const CombatantListing = ({ combatant, combatState }) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState();
  const openPopover = Boolean(popoverAnchorEl);

  const {
    editCombatant
  } = useContext(CombatantContext);

  const theme = useTheme();

  const activePlayerStyle = { backgroundColor: theme.palette.primary.main + '4D' };

  const handleHitPointsClick = e => {
    setPopoverAnchorEl(e.currentTarget);
  };

  const handleHitPointsChange = e => {
    if (e.target.value == null || e.target.value === '') return editCombatant({ ...combatant, currentHitPoints: 0 });
    if (e.target.value > combatant.maxHitPoints || e.target.value === 0) return;
    editCombatant({ ...combatant, currentHitPoints: e.target.value });
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const renderPointTracker = (current, max) => {
    const rendered = [];
    for (let i = 0; i < max; i++) {
      if (i < current) {
        rendered.push(<Circle fontSize="small" />);
        continue;
      }
      rendered.push(<RadioButtonUnchecked fontSize="small" />);
    }
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
    <TableRow style={combatState.activeCombatantId === combatant.id ? activePlayerStyle : null}>
      <TableCell align="center"><Typography component="span">{combatant.name}</Typography></TableCell>      
      <TableCell align="center"><Typography component="span">{combatant.initiativeRating}</Typography></TableCell>
      <TableCell align="center">
        <Stack direction="row" justifyContent="center">
          <Button
            size="small"
            color="error"
            disabled={combatant.currentHitPoints === 0}
            onClick={() => editCombatant({ ...combatant, currentHitPoints: combatant.currentHitPoints - 1 })}
          >
            <Remove />
          </Button>
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
            open={openPopover}
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
          <Button
            size="small"
            color="success"
            disabled={combatant.currentHitPoints === combatant.maxHitPoints}
            onClick={() => editCombatant({ ...combatant, currentHitPoints: combatant.currentHitPoints + 1 })}
          >
            <Add />
          </Button>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="success"
          onClick={handleLuckPointsClick}
          onContextMenu={handleLuckPointsClick}
        >
          {renderPointTracker(combatant.currentLuckPoints, combatant.luckBonus)}
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="primary"
          onClick={handleActionPointsClick}
          onContextMenu={handleActionPointsClick}
        >
          {renderPointTracker(combatant.currentActionPoints, combatant.maxActionPoints)}
        </Button>
      </TableCell>
    </TableRow>
  )
};

export default CombatantListing;