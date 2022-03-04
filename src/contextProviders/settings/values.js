export const defaultSettings = {
  modal: {
    open: false
  },
  userSettings: {
    combatSettings: {
      initiativeVersion: {
        type: 'ENUM',
        values: [
          { name: 'UESRPG 3e v2', selected: false },
          { name: 'UESRPG 3e v3', selected: true }
        ]
      }
    }
  }
};

export const settingsActions = {
  SET_MODAL_OPEN: 'SET_MODAL_OPEN'
};