console.log("TypeScript is running");
//const age: number = "thirty";
//Found 1 error in src/index.ts:2  src/index.ts:2:7 - error TS2322: Type 'string' is not assignable to type 'number'
//// Used tsc --noEmit to check for TypeScript errors without generating JavaScript files.
const age: number =30;

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

// Where did the type annotations go in the output .js file?
// The type annotations were removed during compilation.

// What does this tell you about where TypeScript's type safety lives?
// TypeScript's type safety exists only during development and compilation.
// JavaScript does not contain any type information at runtime.