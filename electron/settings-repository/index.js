const { app } = require('electron');
const fs = require('fs');

const SETTINGS_FILE_LOCATION = `${app.getPath('userData')}/usersettings.json`;

class SettingsRepository {

  constructor() {
    this.refreshSettings();
  }

  #settingTypes = {
    BOOL: 'BOOL',
    MULTISELECT: 'MULTISELECT'
  };

  #settings = { // Default settings
    general: {
      checkForUpdates: {
        display: 'Automaticall Check for Updates',
        type: this.#settingTypes.BOOL,
        value: false
      }
    },
    combat: {
      initiativeVersion: {
        type: this.#settingTypes.MULTISELECT,
        options: [ 'Manual AP Refresh', 'UESRPG 3e v2', 'UESRPG 3e v3' ],
        value: 'UESRPG 3e v2'
      }
    }
  };

  #validateSettingAccess(settingArea, settingItem) {
    const settingAreas = Object.keys(this.#settings);
    if (!settingAreas.includes(settingArea)) {
      throw new Error(`Setting Area ${settingArea} does not exist in the setting object. Available areas: ${JSON.stringify(settingAreas)}`);
    }
    const settingItems = Object.keys(this.#settings[settingArea]);
    if (!settingItems.includes(settingItem)) {
      throw new Error(`Setting Item ${settingItem} does not exist in the ${settingArea} setting area. Available setting items: ${JSON.stringify(settingItems)}`);
    }
    return;
  }

  async #refreshSettings () {
    try {
      fs.accessSync(SETTINGS_FILE_LOCATION);
    } catch (e) {
      fs.writeFileSync(SETTINGS_FILE_LOCATION, JSON.stringify(this.#settings), 'utf8');
    }
    const settings = fs.readFileSync(SETTINGS_FILE_LOCATION, 'utf8');
    return JSON.parse(settings);
  }

  async #persistSettings () {
    fs.writeFileSync(SETTINGS_FILE_LOCATION, JSON.stringify(this.#settings), 'utf8');
  }

  get(settingArea) {
    this.#refreshSettings();
    return this.#settings[settingArea];
  }

  update(settingArea, settingItem, newValue) {
    this.#refreshSettings();

    this.#validateSettingAccess(settingArea, settingItem);

    /* validate the new value */
    // for multiselects
    if (
      this.#settings[settingArea][settingItem].type === this.#settingTypes.MULTISELECT &&
      !this.#settings[settingArea][settingItem].options.includes(newValue)
    ) {
      throw new Error(`The attempted value ${newValue} is not valid. Available options: ${JSON.stringify(this.#settings[settingArea][settingItem].options)}`);
    }

    this.#settings[settingArea][settingItem].value = newValue;
  }
}

module.exports = SettingsRepository;