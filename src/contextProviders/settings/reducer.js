import { produce } from 'immer';
import { settingsActions } from './values';

// Broken for no discernable reason
// export const settingsReducer = produce((draftState, action) => {
//   switch (action.type) {
//     case settingsActions.SET_MODAL_OPEN:
//       draftState.modal.open = action.payload.newOpenValue;
//       break;
//     case settingsActions.SET_USER_SETTINGS:
//       draftState.userSettings = action.payload.userSettings;
//       break;
//     case settingsActions.UPDATE_SETTING_ITEM: 
//       console.log(action);
//       const settingsArea = draftState.userSettings.find(area => area.id === action.payload.settingsAreaId);
//       console.log(settingsArea);
//       for (const [i, settingItem] of settingsArea.settingItems.entries) {
//         if (settingItem.id === action.payload.settingItem.id) {
//           settingsArea.settingItems[i] = action.payload.settingItem;
//           break;
//         }
//       }
//       break;
//     default:
//       throw new Error(`Unrecognized settings action in reducer: ${action.type}`);
//   }
// })

export const settingsReducer = (oldState, action) => {
  switch (action.type) {
    case settingsActions.SET_MODAL_OPEN:
      return produce(oldState, draftState => {
        draftState.modal.open = action.payload.newOpenValue;
      });
    case settingsActions.SET_USER_SETTINGS:
      return produce(oldState, draftState => {
        draftState.userSettings = action.payload.userSettings;
      });
    case settingsActions.UPDATE_SETTING_ITEM:
      return produce(oldState, draftState => {
        for (const [i, settingsArea] of draftState.userSettings.entries()) {
          if (settingsArea.id === action.payload.settingsAreaId) {
            for (const [j, settingItem] of draftState.userSettings[i].settingItems.entries()) {
              if (settingItem.id === action.payload.settingItem.id) {
                draftState.userSettings[i].settingItems[j] = action.payload.settingItem;
                break;
              }
            }
            break;
          }
        }
      });

  }
};