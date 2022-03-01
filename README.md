# UESRPG Companion

## Contributing
If you would like to contribute, feel free to reference an [issue](https://github.com/jamesjtb/uesrpg-companion/issues) or an item in the "Selected for Development" column in the [v1 project](https://github.com/jamesjtb/uesrpg-companion/projects/1). If you're looking to work on a larger feature or change request, you may want to check in with @SupaBeardyMan#6062 on discord to discuss a vision for the feature/change.

To make a pull request, if you're unfamiliar with the process, you can follow the instructions [here](https://gist.github.com/MarcDiethelm/7303312). In your pull request, make sure to detail which items/issues were addressed as part of your code changes.

## Setting Up Your Local Dev Environment
Development is, at this time, only set up for Windows development, specifically in powershell. Elevated permissions (running as Administrator) should not be required. If you would like to set up development (and/or distributable workflow) on a different environment, please leave the existing windows npm scripts intact on the resulting pull request.
1. You will need to install node.js on your local machine. Make sure to download the LTS version from [nodejs.org](https://nodejs.org).
2. Once you've cloned the project onto your machine, use `npm install` from the project's root directory to install the dependencies of the project.
3. To run the UESRPG Companion in development mode, use `npm run dev`.

## Building a Distributable
1. Build the react source code by running `npm run build-react`
2. Pack the app for building using `npm run pack`. This script may throw a false error due to how robocopy returns on a success. This can be ignored unless robocopy itself reported an error.
3. Finally, build the distributable for the app using `npm run build-electron`.
