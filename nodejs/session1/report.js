const fs = require('fs');
const dayjs = require('dayjs');

// Read data.json
const raw = fs.readFileSync('nodejs/session1/data.json', 'utf8');
const data = JSON.parse(raw);

// Get role from command-line arguments
const role = process.argv[2];

// Filter users by role
const users = data.users.filter(user => user.role === role);

// Display report
console.log(`Report generated on: ${dayjs().format('DD MMM YYYY')}`);
console.log(`Role: ${role}`);
console.log('---');

users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name} (ID: ${user.id})`);
});

console.log('---');
console.log(`Total: ${users.length} user(s) found`);