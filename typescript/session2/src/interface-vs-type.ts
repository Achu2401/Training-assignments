// 1. Pagination Response

// Interface is chosen because API response shapes
// are object structures that may be extended later.

interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

// ----------------------------------------

// 2. String or array of strings

// Type is chosen because union types are only
// possible using type aliases.

type StringOrArray = string | string[];

// ----------------------------------------

// 3. Notification

// Interface is chosen because it can be extended
// by EmailNotification, PushNotification, etc.

interface Notification {
  title: string;
  message: string;
}

interface EmailNotification extends Notification {
  email: string;
}

interface PushNotification extends Notification {
  deviceToken: string;
}

// ----------------------------------------

// 4. Callback

// Type is preferred for function signatures.

type NumberProcessor = (num: number) => void;

// ----------------------------------------

// 5. HTTP Methods

// Type is chosen because union literals require
// a type alias.

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH";

// Examples

const response: PaginationResponse<string> = {
  page: 1,
  pageSize: 10,
  total: 100,
  data: ["A", "B", "C"]
};

const input: StringOrArray = ["hello", "world"];

const email: EmailNotification = {
  title: "Welcome",
  message: "Thanks for joining!",
  email: "alice@example.com"
};

const process: NumberProcessor = (num) => {
  console.log(num);
};

const method: HttpMethod = "GET";