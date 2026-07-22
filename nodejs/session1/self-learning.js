const fs = require('fs').promises;

async function fileDemo() {
  try {
    // Write a file
    await fs.writeFile(
      'nodejs/session1/output-async.txt',
      'Hello from fs.promises!'
    );

    // Read it
    const content = await fs.readFile(
      'nodejs/session1/output-async.txt',
      'utf8'
    );
    console.log("File content:", content);

    // Append
    await fs.appendFile(
      'nodejs/session1/output-async.txt',
      '\nThis line was appended asynchronously.'
    );

    // Read again
    const updated = await fs.readFile(
      'nodejs/session1/output-async.txt',
      'utf8'
    );

    console.log("Updated content:");
    console.log(updated);
  } catch (err) {
    console.error(err);
  }
}

fileDemo();