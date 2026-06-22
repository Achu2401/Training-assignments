import { slugify, truncate } from "./helpers";

const slug: string = slugify("Hello World");

const short: string = truncate(
  "This is a long text",
  10
);

console.log(slug);
console.log(short);

/*
When helpers.js is used,
TypeScript has very little information
about parameter and return types.

After migrating to helpers.ts,
TypeScript understands both inputs
and outputs, giving better autocomplete
and error checking.
*/

/*
.d.ts files describe the types of
JavaScript libraries without converting
them to TypeScript.

They let TypeScript understand existing
JavaScript code during migration.
*/
