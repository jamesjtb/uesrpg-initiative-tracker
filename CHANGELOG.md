# Changelog
List new features, changes, and bug fixes by version
## [0.2.0 (unreleased)](https://github.com/jamesjtb/uesrpg-companion/releases/)
### New features:
- Settings Modal
  - Initiative Version (3e v2 or 3e v3 AP refreshing)
- Duplicate Character from Initiative Tracker
### Changes:
- Added additional filters to the "load from file" dialog: specific filter for PCs, specific filter for NPCs.
- Made initiative tracker more compact
- (internal) Moved combatants array into combatState
- Improved character context menu
- Modified initiative rolling modal to use and automate the initiative total roll (1d6 + Initiative Rating) rather than just the 1d6 roll. This is closer to how the players and GM communicate initiative rolls in practice.
### Bug fixes:
- Rolled over bugfix from v0.1.2, adapting for the new combat state structure.

## [0.1.2](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.2)
### Bug fixes:
- Resolved an issue where initiative order was not being sorted properly

## [0.1.1](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.1)
### Bug fixes:
- Resolve issue where rolling for initiative overflows outside of window bounds.
- Also fix the layout of the field input in the initiative rolling modal

## [0.1.0](https://github.com/jamesjtb/uesrpg-companion/releases/tag/v0.1.0)
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
