# Changelog

List new features, changes, and bug fixes by version

## [0.4.0](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.4.0)

### New Features:
-   Bestiary
    - Create, edit, and delete NPCs
-   Party Manager
    -   Create, edit, and delete party members
    -   Manage active party, which automatically adds party members to the initiative tracker

## [0.3.0](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.3.0)

### Notes:
This version uses a new settings format in the backend. As a result, your setting for the initiative version will be reset.

### New features:

-   Checking for updates
    -   Added a setting for automatic update checking on startup (turned off by default)
    -   Added a button to manually trigger an update from the side drawer
-   Added an initiative controls card
-   Added a button to add a combatant at the initiative table's footer

### Changes

-   Changed the app menu to a collapsing "side drawer". Making way for changes in how PCs, NPCs, and Encounters will be created and saved in 0.3.x
-   Changed a ton of background code in how settings are saved. More stability, more realtime updates (changing initiative type mid round, etc)
-   Removed the app's top bar in preparation for upcoming new features

## [0.2.1](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.2.1)

### Changes:

-   Added Initiative Total to Combatant Listing if combat is running
    -   Clicking the Initiative Total for a Combatant Listing will allow the user to edit the combatant's initiative total.
-   At combat stop, set all initiative totals to null

## [0.2.0](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.2.0)

### New features:

-   Display the current version in the top bar title
-   Settings
    -   Settings option in app menu
    -   Combat Settings Panel
        -   Initiative Version Setting (3e v2 or 3e v3 AP refreshing)
    -   Persist settings data between user sessions (saves to `%APPDATA%/userpg-companion/usersettings.json`)
-   AP Refreshing
    -   In v2 initiative version, all combatants' AP resets at top of a new round
    -   In v3 initiative version, AP resets at start of a combatant's turn
-   Duplicate Character from Initiative Tracker
-   Added a color selector to the new/edit combatant component to differentiate between combatants (especially of the same name)
-   Conditions, 1st phase
    -   user can add a condition tag to a combatant which can be removed at any time
-   Persist window position and size between user sessions

### Changes:

-   Added additional filters to the "load from file" dialog: specific filter for PCs, specific filter for NPCs.
-   Made initiative tracker more compact vertically, but temporarily wider
    -   The wider tracker will be reduced in size once statblocks are introduced, as much of the data will be moved to another element
-   (internal data structure) Moved combatants array into combatState
-   Improved character context menu
-   Modified initiative rolling modal to use and automate the initiative total roll (1d6 + Initiative Rating) rather than just the 1d6 roll. This is closer to how the players and GM communicate initiative rolls in practice.
-   Made the initiative tracker list wider in the window. This is temporary, and will change if/when full statblocks and/or character sheets have been implemented. This is to make room for the conditions field, which we'll have room in the narrow view when some fields are moved to their statblock views.

### Bug fixes:

-   Rolled over bugfix from v0.1.2, adapting for the new combat state structure.

## [0.1.2](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.2)

### Bug fixes:

-   Resolved an issue where initiative order was not being sorted properly

## [0.1.1](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.1)

### Bug fixes:

-   Resolve issue where rolling for initiative overflows outside of window bounds.
-   Also fix the layout of the field input in the initiative rolling modal

## [0.1.0](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.0)

### Features:

-   Initiative Tracker
-   Basic Player Characters
-   Basic Non-Player Characters

-   Initiate combat and track current round, turn, and active combatant
-   Very basic automated initiative rolls (with option for inputting physical rolls)
-   Track core combat resources (HP, AP, MP, LP)
-   Edit and Delete combatants
-   Save party (Player Characters) to file
-   Save encounter (Non-Player Characters) to file
-   Load Party or Encounter from File

### Known Issues:

-   When adding a combatant after combat has started, the combatant is added to the bottom of the initiative list rather than having them roll and placed appropriately in the order. An option to roll as they enter if combat is running will be implemented in a future version.
-   When saving or loading parties/encounters, UESRPG Companion doesn't do a very good job of telling the user what is happening behind the scenes with these combatants. This will be handled by a combination of documentation/tooltips and a confirmation dialog box in future versions.
-   Action points do not replenish automatically at the start of an encounter and at the start of each combatant's turn as defined in the 3e v3 rules. This will be implemented in a future version.
