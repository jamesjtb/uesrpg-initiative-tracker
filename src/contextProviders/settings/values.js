export const defaultSettings = {
  modal: {
    open: false
  },
  userSettings: [
    {
      id: 0,
      displayName: 'General',
      settingItems: [
         {
           id: 0,
           displayName: 'Automatically Check for Updates',
           type: 'BOOL',
           value: false
         }
      ]
    },
    {
      id: 1, // used to determine exact position in the array when things get mixed. Must fill every value between 0 and length-1
      displayName: 'Combat',
      settingItems: [
        {
          id: 0, // used to determine exact position in the array when things get mixed. Must fill every value between 0 and length-1
          displayName: 'Initiative Version',
          type: 'ENUM',
          values: [
            { name: 'Manual AP Refresh', selected: false},
            { name: 'UESRPG 3e v2', selected: false },
            { name: 'UESRPG 3e v3', selected: true }
          ]
        }
      ]
    }
  ]
};

export const settingItemTypes = {
  ENUM: 'ENUM',
  BOOL: 'BOOL'
};

export const settingsActions = {
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_USER_SETTINGS: 'SET_USER_SETTINGS',
  UPDATE_SETTING_ITEM: 'UPDATE_SETTING_ITEM',
  SET_LOADED_FROM_FILE: 'SET_LOADED_FROM_FILE'
};