import { combatantActions } from './actions';

export const combatantReducer = (state, action) => {
  switch (action.type) {
    case combatantActions.SET_COMBATANTS:
      return [
        ...state,
        ...action.payload
      ]
  }
}