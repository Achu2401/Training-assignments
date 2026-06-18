//type User = {
  //fullName: string;
//};

//function getUserLabel(user: User): string {
  //return user.fullNme.toUpperCase();
//}

//src/why-ts.ts:6:15 - error TS2551: Property 'fullNme' does not exist on type 'User'. Did you mean 'fullName'?
type User = {
  fullName: string;
};

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase();
}

// In JavaScript, the bug was found only when the program ran.
// In TypeScript, the compiler detected the typo before the program was executed.