interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

const adminUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@gmail.com",
  age: 25,
  role: "admin"
};

const editorUser: User = {
  id: 2,
  name: "Bob",
  email: "bob@gmail.com",
  role: "editor"
};

const viewerUser: User = {
  id: 3,
  name: "Charlie",
  email: "charlie@gmail.com",
  role: "viewer"
};

// Error
/*
const invalidUser: User = {
  id: 4,
  name: "David",
  email: "david@gmail.com",
  role: "superuser"
};
*/
// Error:
// Type '"superuser"' is not assignable to type
// '"admin" | "editor" | "viewer"'.

// Error
//adminUser.id = 10;

// Error:
// Cannot assign to 'id' because it is a read-only property.

/*
readonly protects important properties from accidental
modification. Instead of relying on developers to remember
not to change an ID, TypeScript enforces it during compilation.
*/