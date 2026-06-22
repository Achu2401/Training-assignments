// Task A

type UserId = string;
type ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

// Task B

function getUserById(id: UserId): void {
  console.log(`Getting user: ${id}`);
}

function updateStatus(id: UserId, status: Status): void {
  console.log(`Updating ${id} to ${status}`);
}

function move(direction: Direction, steps: number): void {
  console.log(`Move ${steps} steps towards ${direction}`);
}

// Task C

getUserById("USR001"); // Valid

const productId: ProductId = "PROD001";
getUserById(productId); // Also valid

/*
Observation:

TypeScript does NOT catch this.

Both UserId and ProductId are just aliases for string.
TypeScript uses structural typing, so they are considered compatible.
*/

/*
Structural typing means compatibility is based on the structure
(or underlying type), not the type name.

Since both UserId and ProductId are strings,
TypeScript allows them to be used interchangeably.

This can be a limitation because it cannot prevent accidentally
passing a ProductId where a UserId is expected.
*/