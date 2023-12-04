# next-level-assignment2
This project contains scripts to build, run, and maintain a Node.js application.

Please ensure you have the necessary dependencies installed before running these scripts. Refer to package.json for more information.
Feel free to modify or expand these scripts according to your project requirements.

# .env
Don't forget to add necessary data in the .env file
```
NODE_ENV=""
PORT=""
DATABASE_URL=""
BCRYPT_SALT_ROUNDS=""

```
To run the projct on your local device clone the repository and then run the following command on your terminal
# npm i

## Available Scripts

In the project directory, you can run:

# npm start:prod

Runs the Node.js application in production mode by executing the compiled server file.
bash
npm run start:prod

# npm start:dev
Runs the Node.js application in development mode with auto-reloading using ts-node-dev.

# `npm run build`
Compiles the TypeScript code using the TypeScript compiler (tsc).

# npm run lint
Lints TypeScript files in the src directory using ESLint.

# npm run lint:fix
Lints and automatically fixes linting issues in TypeScript files using ESLint.

# npm run prettier
Formats JavaScript, TypeScript, and JSON files using Prettier according to the rules specified in .prettierrc or .prettierrc.json.

# npm run prettier:fix
Formats JavaScript, TypeScript, and JSON files using Prettier and fixes any formatting issues.

# npm test
Displays an error message as there are no specified tests in this project.

