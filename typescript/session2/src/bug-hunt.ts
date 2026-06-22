interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}


// Bug 1

function applyDiscount(product: Product): number {

  return product.price - (product.discount ?? 0);

}

/*
Without the default value,
subtracting undefined would produce NaN.
*/


// Bug 2

function getTagSummary(product: Product): string {

  return product.tags.join(", ").toUpperCase();

}

/*
The method name was incorrect.

toUppercase() does not exist,
causing a runtime error.
*/


// Bug 3

function createProduct(name: string, price: number): Product {

  return {
    id: Math.random().toString(),
    name,
    price,
    tags: []
  };

}

/*
Without parameter types,
TypeScript reports implicit any.
*/


// Bug 4
/*
function findCheapest(products: Product[]): Product {

  if (products.length === 0) {
    throw new Error("No products available");
  }

  const sorted = [...products].sort(
    (a, b) => a.price - b.price
  );

  return sorted[0];

}


If products is empty,
sorted[0] would be undefined.
*/


// Bug 5

function printProduct(product: Product): void {

  console.log(
    `${product.name} costs ${product.price}`
  );

}

/*
A void function cannot return
product.name.
*/

/*
The "typecheck" script runs the TypeScript compiler
without generating JavaScript files.

Developers usually run it:

- Before committing code
- Before pushing to GitHub
- During Pull Requests
- In CI/CD pipelines

This helps catch type errors early.
*/