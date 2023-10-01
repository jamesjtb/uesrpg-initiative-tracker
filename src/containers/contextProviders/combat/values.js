import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green,
  lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey
} from '@mui/material/colors';

export const combatActions = {
  INITIATE: 'INITIATE',
  START: 'START',
  STOP: 'STOP',
  ADVANCE_TURN: 'ADVANCE_TURN',
  SET_ACTIVE_COMBATANT: 'SET_ACTIVE_COMBATANT',
  SET_COMBATANTS: 'SET_COMBATANTS',
  DELETE_COMBATANT: 'DELETE_COMBATANT',
  EDIT_COMBATANT: 'EDIT_COMBATANT',
  COMMIT_COMBATANT: 'COMMIT_COMBATANT',
  ADD_NEW_COMBATANT: 'ADD_NEW_COMBATANT',
  DUPLICATE_COMBATANT: 'DUPLICATE_COMBATANT'
};

export const combatantStatuses = {
  CREATING: 'CREATING',
  EDITING: 'EDITING',
  COMMITTED: 'COMMITTED'
};

export const combatantTypes = {
  NPC: 'NPC',
  PC: 'PC'
};

export const defaultCombatant = {
  name: "",
  conditions: [],
  currentHitPoints: 0,
  maxHitPoints: 0,
  tempHitPoints: 0,
  currentMagicka: 0,
  maxMagicka: 0,
  currentStaminaPoints: 0,
  maxStaminaPoints: 0,
  currentActionPoints: 3,
  maxActionPoints: 3,
  initiativeRating: 0,
  currentLuckPoints: 0,
  luckBonus: 0,
  initiativeRoll: 0,
  color: null,
  status: combatantStatuses.CREATING
};

export const combatantIntegerFields = [
  'currentHitPoints',
  'maxHitPoints',
  'tempHitPoints',
  'currentMagicka',
  'maxMagicka',
  'currentStaminaPoints',
  'maxStaminaPoints',
  'currentActionPoints',
  'maxActionPoints',
  'initiativeRating',
  'initiativeTotal',
  'currentLuckPoints',
  'luckBonus'
];

export const combatantColors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
  grey[500],
  blueGrey[500]
];