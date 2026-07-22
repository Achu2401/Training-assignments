const path = require('path');

console.log("Directory name:", __dirname);

console.log("File name:", __filename);

const joined = path.join(__dirname, 'data', 'users.json');

console.log("Joined path:", joined);

console.log("Extension:", path.extname('index.html'));

console.log("Basename:", path.basename('/users/rahul/notes.txt'));

console.log("Dirname:", path.dirname('/users/rahul/notes.txt'));

// path.join() automatically uses the correct path separator
// for the operating system and avoids mistakes when building
// file paths. It is safer and more portable than manually
// concatenating strings.