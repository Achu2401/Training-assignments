// process.version returns the installed Node.js version.
// Useful for checking compatibility with packages.
console.log("Node version:", process.version);

// process.platform returns the operating system platform.
// Useful for writing OS-specific code.
console.log("Platform:", process.platform);

// process.cwd() returns the current working directory.
// Useful for locating project files relative to where the app is running.
console.log("Current directory:", process.cwd());

// process.memoryUsage() returns memory usage statistics.
// Useful for monitoring performance and debugging memory issues.
console.log("Memory usage:", process.memoryUsage());

// process.argv contains all command-line arguments.
// Useful for creating CLI tools and scripts.
const args = process.argv;

console.log("All arguments:", args);

// args[2] is the first custom argument provided by the user.
console.log("Your input:", args[2]);

// Real-world use:
// Command-line arguments are useful for passing file names,
// user input, configuration options, or commands to a script.

// process.env.NODE_ENV returns the application's environment
// (development, testing, production).
console.log("NODE_ENV:", process.env.NODE_ENV);

// Returns the user's home directory.
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);

// Real-world use:
// Environment variables are used to store sensitive information
// like database passwords, API keys, and secret tokens.
// This keeps secrets out of the source code and makes it easy
// to use different configurations for development and production.