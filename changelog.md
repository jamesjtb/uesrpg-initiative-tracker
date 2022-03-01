# Changelog
List new features, changes, and bug fixes by version
## 0.2.0 (unreleased)
### New Features:
- 
### Changes:
- Added additional filters to the "load from file" dialog: specific filter for PCs, specific filter for NPCs.
- Made initiative tracker more compact
- Moved combatants array into combatState
### Bug fixes:
- 

## 0.1.0
### Features:
- Initiative Tracker
- Basic Player Characters
- Basic Non-Player Characters 

- Initiate combat and track current round, turn, and active combatant
- Very basic automated initiative rolls (with option for inputting physical rolls)
- Track core combat resources (HP, AP, MP, LP)
- Edit and Delete combatants
- Save party (Player Characters) to file
- Save encounter (Non-Player Characters) to file
- Load Party or Encounter from File

### Known Issues:
- When adding a combatant after combat has started, the combatant is added to the bottom of the initiative list rather than having them roll and placed appropriately in the order. An option to roll as they enter if combat is running will be implemented in a future version.
- When saving or loading parties/encounters, UESRPG Companion doesn't do a very good job of telling the user what is happening behind the scenes with these combatants. This will be handled by a combination of documentation/tooltips and a confirmation dialog box in future versions.
- Action points do not replenish automatically at the start of an encounter and at the start of each combatant's turn as defined in the 3e v3 rules. This will be implemented in a future version.
