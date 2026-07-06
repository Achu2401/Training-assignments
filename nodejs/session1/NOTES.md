# package.json Notes

## name
The name of the Node.js project.

## version
The current version of the project.

## description
A short explanation of what the project does.

## main
The main entry file of the application.

## scripts
Commands that can be executed using npm, such as `npm start`.

## author
The name of the developer or team.

## license
Specifies how others are allowed to use the project.

---

## Why are npm scripts useful?

npm scripts provide easy-to-remember shortcuts for running commands.
Instead of remembering long commands, everyone on the team can simply run
`npm start` or `npm run build`. This keeps the workflow consistent across
different developers and operating systems.


## dependencies vs devDependencies

dependencies are packages required for the application to run in production,
such as Day.js for date formatting.

devDependencies are packages used only during development, testing, or
building the project. They are not required when the application is deployed.

Nodemon belongs in devDependencies because it is only used while developing
the application. It automatically restarts the server whenever files change.


## package.json vs package-lock.json

package.json contains information about the project, such as its name,
scripts, and the packages it depends on.

package-lock.json records the exact versions of every installed package and
their dependencies. It ensures everyone installing the project gets the same
versions, making builds consistent across different machines.

## __dirname and __filename

__dirname contains the absolute path of the current directory.

__filename contains the absolute path of the current file.

They are available in CommonJS modules (require/module.exports).

They are not available in ES Modules (import/export). Instead,
ES Modules use import.meta.url together with fileURLToPath()
from the url module to get similar information.

## npm install vs npm ci

npm install installs project dependencies and updates the
package-lock.json file when necessary.

npm ci installs dependencies exactly as listed in package-lock.json.
It is faster and is mainly used in CI/CD pipelines and production
environments to ensure consistent installations.