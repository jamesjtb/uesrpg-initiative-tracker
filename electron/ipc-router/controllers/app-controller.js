const { app } = require('electron');

const { writeFile, readFile} = require('fs').promises;

module.exports = {
    quitApp: () => app.quit(),
    getAppVersion: () => app.getVersion(),
    saveUserSettings: async (userSettings) => {
        const writeResult = await writeFile(`${app.getPath('userData')}/usersettings.json`, JSON.stringify(userSettings), 'utf8');
        return writeResult;
    },
    loadUserSettings: async () => {
        try {
            const fileContents = await readFile(`${app.getPath('userData')}/usersettings.json`, 'utf8');
            return JSON.parse(fileContents);
        } catch (e) {
            console.log(`Error loading user settings: ${e.message}`);
            return null;
        }
    }
}