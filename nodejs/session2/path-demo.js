const path = require('path')

// __dirname returns the absolute path of the folder where this file is located.
// Useful when accessing files relative to the current script.
console.log('Current directory:', __dirname)

// __filename returns the absolute path of the current file.
// Useful for debugging or identifying the executing file.
console.log('Current file:     ', __filename)

const filePath = path.join(__dirname, 'data', 'users.json')

// path.join() safely joins path segments using the correct separator
// for the current operating system.
console.log('Joined path:', filePath)

// Returns only the file name from a path.
console.log('Basename:', path.basename('/home/user/notes.txt'))

// Returns the file extension.
console.log('Extension:', path.extname('index.html'))

// Returns the directory portion of a path.
console.log('Dirname:  ', path.dirname('/home/user/notes.txt'))

// Manual string concatenation — works but is fragile because
// different operating systems use different path separators.
const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() safely joins path segments.
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() always returns an absolute path.
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

/*
Difference between path.join() and path.resolve()

1. path.join()
- Joins the given path segments.
- Cleans extra slashes.
- Returns a relative path if the first argument is relative.
- Returns an absolute path only if one of the segments is absolute.

2. path.resolve()
- Resolves the path from right to left.
- Always returns an absolute path.
- If no absolute path is provided, it uses the current working directory (process.cwd()).

Example:

path.join('data', 'users.json')
=> data/users.json

path.resolve('data', 'users.json')
=>  C:\Users\Gowri Shankar\Downloads\js-training\data\users.json
*/