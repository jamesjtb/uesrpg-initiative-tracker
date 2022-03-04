import { settingsActions } from './values';

export const settingsReducer = (oldState, action) => {
  switch (action.type) {
    case settingsActions.SET_MODAL_OPEN:
      return {
        ...oldState,
        modal: {
          ...oldState.settingsModal,
          open: action.payload.newOpenValue
        }
      };
    default:
      throw new Error(`Unrecognized settings action in reducer: ${action.type}`);
  }
};