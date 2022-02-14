
export const combatantActions = {
  SET_COMBATANTS: 'SET_COMBATANTS',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  COMMIT: 'COMMIT',
  ADD_NEW: 'ADD_NEW'
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
  currentActionPoints: 3,
  maxActionPoints: 3,
  initiativeRating: 0,
  currentLuckPoints: 0,
  luckBonus: 0,
  initiativeRoll: 0,
  status: combatantStatuses.CREATING
};