# 📘 Learn TypeScript – With Examples

A beginner → advanced roadmap with simple examples for each concept.

---

# 🚀 Module 1: Fundamentals

## 🛠️ Install & Run

```bash
npm install -g typescript
tsc --init
tsc index.ts
```

---

## 🔹 1-4 Primitive Types

```ts
let username: string = "Hafz";
let age: number = 25;
let isAdmin: boolean = false;
let data: null = null;
let value: undefined = undefined;
```

---

## 🔹 1-5 Non-Primitive Types

```ts
let numbers: number[] = [1, 2, 3];

let user: { name: string; age: number } = {
  name: "Hafz",
  age: 25,
};

let tuple: [string, number] = ["age", 25];
```

---

## 🔹 1-6 Object, Literal & Optional

```ts
type User = {
  name: string;
  age?: number; // optional
};

const u1: User = { name: "Omar" };
```

---

## 🔹 1-7 Function

```ts
function multiply(a: number, b: number): number {
  return a * b;
}
```

---

## 🔹 1-8 Rest & Spread

```ts
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
```

---

## 🔹 1-9 Destructuring

```ts
const person = { name: "Ali", age: 30 };

const { name, age } = person;

const nums = [10, 20];
const [a, b] = nums;
```

---

## 🔹 1-10 Type Alias

```ts
type ID = string | number;

let userId: ID = "123";
```

---

## 🔹 1-11 Union & Intersection

```ts
type A = { name: string };
type B = { age: number };

type Person = A & B; // intersection

let p: string | number;
p = "hello";
```

---

## 🔹 1-12 Modern Operators

```ts
let value = null ?? "default"; // nullish

let result = true ? "yes" : "no"; // ternary

let user = { profile: { name: "Hafz" } };
console.log(user?.profile?.name); // optional chaining
```

---

## 🔹 1-13 Special Types

```ts
let unknownValue: unknown = "test";

function throwError(): never {
  throw new Error("Error!");
}
```

---

# ⚡ Module 2: Advanced

## 🔹 2-1 Type Assertion

```ts
let value: unknown = "Hello";
let len = (value as string).length;
```

---

## 🔹 2-2 Interface

```ts
interface Person {
  name: string;
  age: number;
}
```

---

## 🔹 2-3 Generics

```ts
function identity<T>(val: T): T {
  return val;
}

identity<string>("Hello");
```

---

## 🔹 2-4 Generics with Interface

```ts
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 10 };
```

---

## 🔹 2-5 Generics with Function

```ts
function getArray<T>(items: T[]): T[] {
  return items;
}
```

---

## 🔹 2-6 Constraint

```ts
function printLength<T extends { length: number }>(item: T) {
  console.log(item.length);
}
```

---

## 🔹 2-7 keyof

```ts
function getProp<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

---

## 🔹 2-8 Enum

```ts
enum Role {
  Admin,
  User,
}
```

---

## 🔹 2-9 as const

```ts
const roles = ["admin", "user"] as const;
```

---

## 🔹 2-10 Conditional Type

```ts
type IsString<T> = T extends string ? true : false;
```

---

## 🔹 2-11 Mapped Type

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
```

---

## 🔹 2-12 Utility Types

```ts
type User = {
  name: string;
  age: number;
};

type PartialUser = Partial<User>;
```

---

# 🧠 Module 3: OOP in TypeScript

## 🔹 3-1 Class & Object

```ts
class Animal {
  constructor(public name: string) {}
}

const dog = new Animal("Tommy");
```

---

## 🔹 3-2 Inheritance

```ts
class Dog extends Animal {
  bark() {
    console.log("Woof");
  }
}
```

---

## 🔹 3-3 Type Guard (typeof, in)

```ts
function check(val: string | number) {
  if (typeof val === "string") {
    console.log("string");
  }
}
```

---

## 🔹 3-4 instanceof

```ts
if (dog instanceof Animal) {
  console.log("Yes");
}
```

---

## 🔹 3-5 Access Modifiers

```ts
class User {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

---

## 🔹 3-6 Getter & Setter

```ts
class Person {
  private _age = 0;

  get age() {
    return this._age;
  }

  set age(val: number) {
    this._age = val;
  }
}
```

---

## 🔹 3-7 Static

```ts
class Counter {
  static count = 0;
}
```

---

## 🔹 3-8 Polymorphism

```ts
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  area(): number {
    return 3.14;
  }
}
```

---

## 🔹 3-9 Abstraction

```ts
abstract class Vehicle {
  abstract start(): void;
}
```

---

## 🔹 3-10 Encapsulation

```ts
class Bank {
  private balance = 0;

  deposit(amount: number) {
    this.balance += amount;
  }
}
```

---

# ✅ Final Tips

* Practice daily
* Build real projects
* Debug errors carefully
* Convert JS → TS for learning

---

🔥 **Want next?**
I can give you:

* Real project (Todo / API)
* Interview questions
* Practice problems

Just tell me 👍
