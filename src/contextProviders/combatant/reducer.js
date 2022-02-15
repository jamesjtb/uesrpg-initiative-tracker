import { combatantActions, combatantStatuses, defaultCombatant } from './values';
import { uuid } from '../../util/utils';

// Normalize data types in one place rather than at each edit point
const correctDataTypes = combatant => {
  const correctedObject = {};
  const intFields = [
    'currentHitPoints',
    'maxHitPoints',
    'tempHitPoints',
    'currentActionPoints',
    'maxActionPoints',
    'intiativeRating',
    'currentLuckPoints',
    'luckBonus',
    'initiativeRoll'
  ];
  for (const field in combatant) {
    if (intFields.includes(field)) {
      correctedObject[field] = parseInt(combatant[field]);
      continue;
    };
    correctedObject[field] = combatant[field];
  }
  return correctedObject;
};

export const combatantReducer = (oldState, action) => {
  switch (action.type) {
    // Complete overwrite
    case combatantActions.SET_COMBATANTS:
      return [
        ...action.payload
      ]
    // Add a new combatant
    case combatantActions.ADD_NEW:
      return [
        ...oldState,
        { ...defaultCombatant, id: uuid(), type: action.payload.type }
      ]
    // Edit an existing combatant
    case combatantActions.EDIT:
      return oldState.map(combatant => (
        combatant.id === action.payload.id ? correctDataTypes({ ...action.payload }) : combatant
      ));
    // Commit a combatant in CREATING status
    case combatantActions.COMMIT:
      return oldState.map(combatant => (
        combatant.id === action.payload.id ? { ...combatant, status: combatantStatuses.COMMITTED } : combatant
      ));
    // Delete a combatant
    case combatantActions.DELETE:
      return oldState.filter(combatant => action.payload.id !== combatant.id);
    default:
      throw new Error(`Unrecognized combatant action in reducer: ${action.type}`);
  }
};