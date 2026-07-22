const os = require('os')

// Returns the operating system platform (e.g., win32, linux, darwin).
// Useful for writing platform-specific code.
console.log('Platform:     ', os.platform())

// Returns the CPU architecture (e.g., x64, arm64).
// Useful when checking system compatibility.
console.log('Architecture: ', os.arch())

// Returns the computer's hostname (device name on the network).
// Useful for logging and identifying servers.
console.log('Hostname:     ', os.hostname())

// Returns the current user's home directory.
// Useful for storing user-specific files.
console.log('Home dir:     ', os.homedir())

// Returns information about all CPU cores.
// .length gives the number of CPU cores.
console.log('CPU cores:    ', os.cpus().length)

// Returns the total system memory in MB.
const totalMB = Math.round(os.totalmem() / 1024 / 1024)

// Returns the currently available free memory in MB.
const freeMB = Math.round(os.freemem() / 1024 / 1024)

// Displays the amount of free and total memory.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)

// Gets the operating system platform.
const platform = os.platform()

// Executes code based on the operating system.
if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

// Calculates the percentage of free memory.
const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)

// Prints a warning if available memory is below 20%.
if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}

/*
Real-world example:

A Node.js application may need to check the operating system
to use different file paths or execute platform-specific commands.

Example:
- On Windows, use "dir" to list files.
- On Linux or macOS, use "ls" to list files.

This helps the application work correctly on different operating systems.
*/