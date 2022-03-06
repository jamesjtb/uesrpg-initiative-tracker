export const combatActions = {
  INITIATE: 'INITIATE',
  START: 'START',
  STOP: 'STOP',
  ADVANCE_TURN: 'ADVANCE_TURN',
  SET_COMBATANTS: 'SET_COMBATANTS',
  DELETE_COMBATANT: 'DELETE_COMBATANT',
  EDIT_COMBATANT: 'EDIT_COMBATANT',
  COMMIT_COMBATANT: 'COMMIT_COMBATANT',
  ADD_NEW_COMBATANT: 'ADD_NEW_COMBATANT'
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
  'luckBonus',
  'initiativeRoll'
];