const fs = require('fs');

// writeFileSync creates a new file or overwrites an existing file.
// Useful when you want to replace the file's contents completely.
fs.writeFileSync(
  'nodejs/session1/output.txt',
  'Hello from Node.js file system!'
);

// Read the file
const content = fs.readFileSync('nodejs/session1/output.txt', 'utf8');
console.log("File content:", content);

// appendFileSync adds new content to the end of the file
// without deleting the existing content.
fs.appendFileSync(
  'nodejs/session1/output.txt',
  '\nThis line was appended.'
);

// Read again
const updated = fs.readFileSync('nodejs/session1/output.txt', 'utf8');
console.log("Updated content:", updated);