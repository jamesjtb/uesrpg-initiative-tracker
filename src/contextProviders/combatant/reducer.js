import { combatantActions, combatantStatuses, defaultCombatant } from './values';
import { uuid } from '../../util/utils';

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
        combatant.id === action.payload.id ? { ...action.payload } : combatant
      ));
    // Commit a combatant in CREATING status
    case combatantActions.COMMIT:
      return oldState.map(combatant => (
        combatant.id === action.payload.id ? { ...combatant, status: combatantStatuses.COMITTED } : combatant
      ));
    // Delete a combatant
    case combatantActions.DELETE:
      return oldState.filter(combatant => action.payload.id !== combatant.id);
  }
};