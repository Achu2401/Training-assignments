const os = require('os');

console.log("Platform:", os.platform());

console.log("Architecture:", os.arch());

console.log("Hostname:", os.hostname());

console.log("Home directory:", os.homedir());

console.log("CPUs:", os.cpus().length);

console.log(
  "Total memory (MB):",
  Math.round(os.totalmem() / 1024 / 1024)
);

console.log(
  "Free memory (MB):",
  Math.round(os.freemem() / 1024 / 1024)
);

// Real-world example:
// A Node.js application can use the platform information to run
// operating system specific code, and it can check available memory
// to avoid overloading the system or to optimize performance.