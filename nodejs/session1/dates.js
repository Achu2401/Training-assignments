// require('dayjs') loads the Day.js library from the node_modules folder.
// Node.js first checks built-in modules, then looks inside the project's
// node_modules directory to find the installed package.

const dayjs = require('dayjs');

console.log("Today:", dayjs().format('DD/MM/YYYY'));

console.log("Day of week:", dayjs().format('dddd'));

console.log("Next week:", dayjs().add(7, 'day').format('DD/MM/YYYY'));

console.log("Is before 2030?", dayjs().isBefore('2030-01-01'));