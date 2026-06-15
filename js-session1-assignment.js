console.log("Hello");

//Section 1 — Variables & Types
const name ="Akshaya";
let age =20;
const role= "AI & DS Engineering Student";
let isAvailable= true;
//const name  = "Priya";
//Uncaught SyntaxError: Identifier 'name' has already been declared

console.log("name is a "+ typeof name);
console.log("age is a " +typeof age);
console.log("role is a " +typeof role);
console.log("isAvailable is a " +typeof isAvailable);

//Section 2 — Template Literals
console.log(`Hi, I'm ${name} and I'm a ${role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${name.length} characters`);

//Section 3 — Arrow Functions
const fullName =(first, last)=> `${first} ${last}`;
const isAdult =(age) =>age >= 18;
const formatUser= (user) =>`${user.name} - ${user.role}`;

console.log(fullName("Alice","Johnson"));
console.log(isAdult(20));
console.log(formatUser({ name:"Alice",role: "dev" }));

//Section 4 — Objects & Destructuring

const user ={
  id: 1,
  nam: "Alice",
  rol: "dev",
  active: true,
  address:{
    city: "Mumbai",
    country: "India"
  }
};

const{ nam, rol, active } = user;

const{
  address:{ city }
}= user;

const updatedUser= {
  ...user,
  active:false
};

console.log(nam);
console.log(rol);
console.log(active);
console.log(city);
console.log(updatedUser);

//Section 5 — Arrays & Spread

const devs =["Alice", "Carol"];
const designers =["Bob", "Dan"];

const team= [...devs, ...designers];
const updatedTeam=[...team, "Eve"];
const [firstMember,secondMember] = team;
console.log(team);
console.log(updatedTeam);
console.log(firstMember);
console.log(secondMember);

//Section 6 — Array `map` & `filter`
const users = [
  {id:1,name: "Alice", role: "dev", active: true },
  {id:2,name:"Bob", role: "design", active: false },
  {id:3,name: "Carol", role: "dev", active: true },
  {id:4, name:"Dan", role:"design", active: true },
  {id:5, name:"Eve", role:"dev", active: false },
];

const activeUserNames = users
  .filter(user=> user.active)
  .map(user =>user.name);

const devUsers= users.filter(user => user.role === "dev");

const userDescriptions = users.map(
  user =>`${user.name} is a ${user.role}`
);

const activeDevNames =users
  .filter(user =>user.active && user.role === "dev")
  .map(user =>user.name);

console.log(activeUserNames);
console.log(devUsers);
console.log(userDescriptions);
console.log(activeDevNames);

//Section 7 — Array Functions

const userss =[
  { id: 1, name: "Alice", role: "dev", active: true },
  { id: 2, name: "Bob", role: "design", active: false },
  { id: 3, name: "Carol", role: "dev", active: true },
  { id: 4, name: "Dan", role: "design", active: true },
  { id: 5, name: "Eve", role: "dev", active: false },
];

const usersPerRole= userss.reduce((acc, user) => {
  acc[user.role] =(acc[user.role] || 0) + 1;
  return acc;
}, {});

const firstActiveDesigner =userss.find(
  user => user.role ==="design" && user.active
);

const hasInactiveUser= userss.some(user => !user.active);
const allHaveRole =userss.every(user=> user.role);

console.log(usersPerRole);
console.log(firstActiveDesigner);
console.log(hasInactiveUser);
console.log(allHaveRole);

//Section 8 — Spot & Fix the Bugs
// 1. Loose equality trap

const input = "5";
const score =5;

// Use strict equality (===) to avoid this error.
// "5" (string) and 5 (number) are different datatypes.
if (input ===score) {
  console.log("match");
}

// 2. Missing return in arrow function

// When using curly braces {}, explicitly return the value.
// Without return, each call returns undefined.
const doubled=[1,2,3].map(n => {
  return n*2;
});
console.log(doubled);

// 3. Mutating original array

const original =[1,2,3];

// Using push() modifies the original array.
// Spread creates a new array without changing the original.
const newArray=[...original, 4];

console.log(original);
console.log(newArray);

// 4. const object reassignment confusion

const usersss={name:"Alice",active: true };

// const prevents reassignment of the variable, but object properties can still be modified.
user.active=false;

console.log(user);

// This will throw:
// TypeError: Assignment to constant variable.
// user = { name: "Bob" };