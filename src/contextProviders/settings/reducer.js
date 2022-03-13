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
    case settingsActions.UPDATE_SETTING_ITEM:
      return {
        ...oldState,
        modal: { ...oldState.modal },
        userSettings: oldState.userSettings.map(oldSettingsArea => (
          oldSettingsArea.id === action.payload.settingsAreaId ? 
            { ...oldSettingsArea, settingItems: oldSettingsArea.settingItems.map(oldSettingItem => (
              oldSettingItem.id === action.payload.settingItem.id ?
                { ...action.payload.settingItem, values: [ ...action.payload.settingItem.values ] } :
                { ...oldSettingItem, values: [ ...oldSettingItem.values ] }
            ))} :
            { ...oldSettingsArea, settingItems: oldSettingsArea.settingItems.map(oldSettingItem => ({ ...oldSettingItem, values: [ ...oldSettingItem.values ]}))}
        ))
      };
    default:
      throw new Error(`Unrecognized settings action in reducer: ${action.type}`);
  }
};