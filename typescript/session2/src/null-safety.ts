// Function 1
/*
function getFirstWord(sentence: string | null): string {
  if (sentence === null) {
    return "";
  }

  return sentence.split(" ")[0];
}


Without this check, calling split() on null
would cause a runtime error:
"Cannot read properties of null".
*/


// Function 2

function getUserAge(user: { name: string; age?: number }): string {
  if (user.age !== undefined) {
    return `${user.name} is ${user.age.toString()} years old`;
  }

  return `${user.name}'s age is unknown`;
}

/*
If age is undefined, calling toString()
would throw a runtime error.
*/


// Function 3

const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};

function getDbPort(): number {
  return config.database.port;
}

/*
No fix needed.

TypeScript knows database and port always exist.
*/


// Function 4

const users = ["Alice", "Bob", "Charlie"];

function findUser(name: string): string {
  const found = users.find(user => user === name);

  if (found === undefined) {
    return "User not found";
  }

  return found.toUpperCase();
}

/*
If find() returns undefined,
calling toUpperCase() would throw
"Cannot read properties of undefined".
*/