# TypeScript's `any` vs `unknown`: The Type Safety Showdown

## What is `any`?
any is a TypeScript type that allows a variable to hold any value and can be used in any way. When you declare a variable with type any, TypeScript skips all type checking for that variable.


### Example of `any`:
```typescript
let data: any = { name: "Alice", age: 30 };

console.log(data.name); // Works
console.log(data.toUpperCase()); // Works but causes runtime error
console.log(data.nonExistentMethod()); // Works but causes runtime error

data = "string";
data = 123;
data = null;
```

All of these work without TypeScript complaining.

---
## Why `any` is Dangerous

1. No error checking - TypeScript won't warn you about wrong operations
2. Hidden bugs at runtime - Errors appear when code runs, not during compilation
3. No autocomplete - IDE can't suggest methods or properties
4. Breaks refactoring - Renaming properties won't show what breaks

---

## What is `unknown`?

`unknown` is a type-safe alternative to `any`. It allows a variable to hold any value, but forces you to check the type before using it.

### Example of `unknown`:

```typescript
let data: unknown = { name: "Alice", age: 30 };

console.log(data.name); // Error: Object is of type 'unknown'

if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log((data as { name: string }).name); // Now it's safe
}
```

TypeScript forces you to check before using.



## Type Narrowing Techniques

Type narrowing is the process of checking a variable's type and refining it to a more specific type.

### 1. typeof Guard

```typescript
function processValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
    console.log(value.toFixed(2));
  }
}

processValue("hello"); // HELLO
processValue(42); // 42.00
```

### 2. instanceof Guard

```typescript
class User {
  constructor(public name: string) {}
}

function handleUser(user: unknown) {
  if (user instanceof User) {
    console.log(`User: ${user.name}`);
  }
}

handleUser(new User("Alice")); // User: Alice
```

### 3. Property Check with `in` Operator

```typescript
interface Car {
  brand: string;
  wheels: number;
}

interface Bike {
  brand: string;
  hasTraining: boolean;
}

function describe(vehicle: unknown) {
  if (typeof vehicle === 'object' && vehicle !== null) {
    if ('wheels' in vehicle) {
      const car = vehicle as Car;
      console.log(`Car: ${car.brand} with ${car.wheels} wheels`);
    } else if ('hasTraining' in vehicle) {
      const bike = vehicle as Bike;
      console.log(`Bike: ${bike.brand}`);
    }
  }
}

describe({ brand: "Toyota", wheels: 4 }); // Car: Toyota with 4 wheels
describe({ brand: "Trek", hasTraining: false }); // Bike: Trek
```

### 4. Custom Type Guard Function

```typescript
interface UserData {
  name: string;
  email: string;
}

function isUserData(value: unknown): value is UserData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'email' in value &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string'
  );
}

function processUser(data: unknown) {
  if (isUserData(data)) {
    console.log(`${data.name} (${data.email})`);
  } else {
    console.log('Invalid user data');
  }
}

processUser({ name: 'Alice', email: 'alice@example.com' }); // Alice (alice@example.com)
processUser({ name: 'Bob' }); // Invalid user data
```

---

## Real-World Example: API Response

```typescript
interface User {
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<unknown> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string'
  );
}

async function getUser(id: string) {
  const data = await fetchUser(id);

  if (isUser(data)) {
    console.log(`${data.name} (${data.email})`);
  } else {
    console.error('Invalid user data');
  }
}
```

---

## Summary

Use `unknown` instead of `any`. It forces type checking and keeps your code safe. Use type narrowing to transform `unknown` into specific types.
