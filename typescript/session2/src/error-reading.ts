/*

Error 1


Property 'username' does not exist on type 'User'.

Meaning:
Trying to access a property that isn't defined.

Code:

interface User {
  name: string;
}

const user: User = {
  name: "Alice"
};

console.log(user.username);

Fix:

console.log(user.name);

*/


/*
===========================
Error 2
===========================

Argument of type 'string'
is not assignable to parameter
of type 'number'.

Meaning:
Passing the wrong data type.

Code:

function square(num: number) {}

square("5");

Fix:

square(5);

*/


/*
===========================
Error 3
===========================

Parameter 'data'
implicitly has an 'any' type.

Meaning:
Parameter has no type.

Code:

function print(data) {
  console.log(data);
}

Fix:

function print(data: string) {
  console.log(data);
}

*/


/*
===========================
Error 4
===========================

Object is possibly 'undefined'.

Meaning:
Trying to access a value
that might not exist.

Code:

const names = ["Alice"];

const name = names.find(
  n => n === "Bob"
);

console.log(name.toUpperCase());

Fix:

if (name) {
  console.log(name.toUpperCase());
}

*/


/*
===========================
Error 5
===========================

Type 'string | undefined'
is not assignable to type 'string'.

Meaning:
Optional values may be undefined.

Code:

interface User {
  email?: string;
}

const email: string = user.email;

Fix:

const email =
  user.email ?? "No Email";

*/