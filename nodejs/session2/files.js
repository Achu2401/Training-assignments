const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Writes data to a file.
// If the file already exists, its contents are overwritten.
fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

// Reads the file contents as a string.
const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

// Appends data to the end of the file without removing existing content.
fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

// Reads the updated file.
const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)

// Checks whether missing.txt exists.
const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
Difference between writeFileSync() and appendFileSync()

writeFileSync()
- Creates a new file if it does not exist.
- Overwrites the entire file if it already exists.

appendFileSync()
- Creates the file if it does not exist.
- Adds new content to the end of the existing file without deleting previous content.
*/

/*
Explore:

If readFileSync() is used on a file that does not exist,
Node.js throws an ENOENT (Error NO ENTry) exception and
the program stops unless the error is handled.

A proper way to handle this is to:
- Check whether the file exists using fs.existsSync(), or
- Use a try...catch block to catch and handle the error gracefully.
*/