interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Product {
  readonly id: number;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  readonly id: number;
  customer: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

function calculateTotal(order: Order): number {
  let total = 0;

  for (const item of order.items) {
    total += item.product.price * item.quantity;
  }

  return total;
}

const order: Order = {
  id: 101,
  customer: "Alice",

  items: [
    {
      product: {
        id: 1,
        name: "Laptop",
        price: 50000,
        category: "Electronics"
      },
      quantity: 2
    },
    {
      product: {
        id: 2,
        name: "Mouse",
        price: 1000,
        category: "Accessories"
      },
      quantity: 3
    }
  ],

  shippingAddress: {
    street: "12 MG Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "641001"
  },

  status: "pending",
  createdAt: new Date()
};

console.log(calculateTotal(order));

/*
Recursive Type Example

interface TreeNode {
    value: number;
    children: TreeNode[];
}

Each TreeNode contains an array of TreeNode objects,
allowing trees of any depth.
*/