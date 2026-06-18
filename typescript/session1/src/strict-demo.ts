// noImplicitAny example

//function greet(name) {console.log("Hello", name);}
//src/strict-demo.ts:3:16 - error TS7006: Parameter 'name' implicitly has an 'any' type.

function greet(name: string) {
  console.log("Hello", name);
}

// strictNullChecks example

//let username: string = null;
//src/strict-demo.ts:12:5 - error TS2322: Type 'null' is not assignable to type 'string'.

let username: string = "Akshaya";