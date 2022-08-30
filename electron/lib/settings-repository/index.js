const { app } = require('electron');
const fs = require('fs');

const SETTINGS_FILE_LOCATION = `${app.getPath('userData')}/usersettings.json`;

class SettingsRepository {

  constructor() {
    this.#refreshSettings();
  }

  #settingTypes = require('../../../src/shared/settings-values').SETTING_TYPES;

  #settings = { // Default settings
    general: {
      checkForUpdates: {
        display: 'Automatically Check for Updates',
        type: this.#settingTypes.BOOL,
        value: false
      }
    },
    combat: {
      initiativeVersion: {
        display: 'Initiative Version',
        type: this.#settingTypes.MULTISELECT,
        options: [ 'Manual AP Refresh', 'UESRPG 3e v2', 'UESRPG 3e v3' ],
        value: 'UESRPG 3e v2'
      }
    }
  };

  #validateSettingAccess(settingArea, settingName) {
    const settingAreas = Object.keys(this.#settings);
    if (!settingAreas.includes(settingArea)) {
      throw new Error(`Setting Area ${settingArea} does not exist in the setting object. Available areas: ${JSON.stringify(settingAreas)}`);
    }
    const settingItems = Object.keys(this.#settings[settingArea]);
    if (!settingItems.includes(settingName)) {
      throw new Error(`Setting Item ${settingName} does not exist in the ${settingArea} setting area. Available setting items: ${JSON.stringify(settingItems)}`);
    }
    return;
  }

  #refreshSettings () {
    try {
      fs.accessSync(SETTINGS_FILE_LOCATION);
    } catch (e) {
      fs.writeFileSync(SETTINGS_FILE_LOCATION, JSON.stringify(this.#settings), 'utf8');
    }
    const settings = fs.readFileSync(SETTINGS_FILE_LOCATION, 'utf8');
    this.#settings = JSON.parse(settings);
  }

  #persistSettings () {
    fs.writeFileSync(SETTINGS_FILE_LOCATION, JSON.stringify(this.#settings), 'utf8');
  }

  getTypes() {
    return this.#settingTypes;
  }

  getAreas() {
    return Object.keys(this.#settings);
  }

  get(settingArea) {
    this.#refreshSettings();
    return this.#settings[settingArea];
  }

  update({ settingArea, settingName, newValue }) {
    this.#refreshSettings();
    this.#validateSettingAccess(settingArea, settingName);

    /* validate the new value */
    // for multiselects
    if (
      this.#settings[settingArea][settingName].type === this.#settingTypes.MULTISELECT &&
      !this.#settings[settingArea][settingName].options.includes(newValue)
    ) {
      throw new Error(`The attempted value ${newValue} is not valid. Available options: ${JSON.stringify(this.#settings[settingArea][settingName].options)}`);
    }

    this.#settings[settingArea][settingName].value = newValue;
    this.#persistSettings();
  }
}

module.exports = SettingsRepository;