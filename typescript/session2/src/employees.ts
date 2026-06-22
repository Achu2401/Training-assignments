interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${
    employee.department
  }, joined on ${employee.startDate.toLocaleDateString()}`;
}

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com"
};

const employee: Employee = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@gmail.com",
  employeeId: "EMP001",
  department: "Engineering",
  startDate: new Date("2024-01-01")
};

const manager: Manager = {
  firstName: "Sarah",
  lastName: "Wilson",
  email: "sarah@gmail.com",
  employeeId: "EMP002",
  department: "Engineering",
  startDate: new Date("2023-06-01"),
  teamSize: 5,
  directReports: ["EMP003", "EMP004"]
};

console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

console.log(introduceEmployee(employee));
console.log(introduceEmployee(manager));

/*
Employee extends Person,
and Manager extends Employee.

That means both Employee and Manager contain
all the properties required by Person.

This is why getFullName() accepts all three.
*/