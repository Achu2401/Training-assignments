// Task A

function describe(value: string | number | boolean | null): string {

  if (value === null) {
    return "No value provided";
  }

  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }

  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }

  return `Boolean: ${value}`;
}


// Task B

interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function makeSound(animal: Cat | Dog): void {

  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }

}


// Task C

function summarise(input: string | number[] | { label: string }): string {

  if (typeof input === "string") {
    return `String: ${input}`;
  }

  if (Array.isArray(input)) {
    return `Array with ${input.length} numbers`;
  }

  return `Label: ${input.label}`;
}


/*
Discriminated Union Example

interface Cat {
  kind: "cat";
  meow(): void;
}

interface Dog {
  kind: "dog";
  bark(): void;
}

function makeSound(animal: Cat | Dog) {

  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }

}

Using a "kind" property is more reliable than
checking with the "in" operator because every
type explicitly identifies itself.
*/