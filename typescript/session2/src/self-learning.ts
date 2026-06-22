// User interface from Task 1.1

interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@gmail.com",
  age: 25,
  role: "admin"
};



// 1. Partial<T>

/*
Partial<T> makes all properties optional.
Useful for updating only a few fields.
*/

function updateUser(
  existingUser: User,
  updates: Partial<User>
): User {
  return {
    ...existingUser,
    ...updates
  };
}

const updatedUser = updateUser(user, {
  age: 26,
  email: "alice123@gmail.com"
});

console.log(updatedUser);

// 2. Pick<T, K>

/*
Pick<T, K> selects only specific properties
from a type.
*/

type UserContact = Pick<User, "name" | "email">;

function sendWelcomeEmail(user: UserContact): void {
  console.log(
    `Welcome ${user.name}! Email sent to ${user.email}`
  );
}

sendWelcomeEmail({
  name: "Bob",
  email: "bob@gmail.com"
});


// 3. Omit<T, K>

/*
Omit<T, K> removes selected properties
from a type.
*/

type NewUser = Omit<User, "id">;

function createUser(user: NewUser): User {

  const generatedId = Math.floor(Math.random() * 1000);

  return {
    id: generatedId,
    ...user
  };

}

const newUser = createUser({
  name: "Charlie",
  email: "charlie@gmail.com",
  role: "viewer"
});

console.log(newUser);


// 4. Record<K, V>

/*
Record<K, V> creates an object where
keys are of type K and values are of type V.
*/

type Role = User["role"];

type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {

  admin: [
    "create",
    "update",
    "delete",
    "view"
  ],

  editor: [
    "update",
    "view"
  ],

  viewer: [
    "view"
  ]

};

function getPermissions(role: Role): string[] {
  return permissions[role];
}

console.log(getPermissions("admin"));
console.log(getPermissions("viewer"));