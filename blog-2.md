# The Four Pillars of OOP in TypeScript

OOP has four core principles that make your code easier to understand, change, and scale. Without them, large codebases become tangled messes where one change breaks five other things. These pillars solve that.


## 1. Encapsulation
 Keep an object's internal data private. Force all changes to go through controlled methods, not direct access.

**Why this matters in practice:** Imagine a balance field that anyone can set directly — nothing stops account.balance = -999. Encapsulation puts a guard around that. Every deposit or withdrawal goes through a method that validates first. This means bugs are caught early, and when something breaks, you know exactly where to look — inside the class, not scattered across your whole codebase.

Another benefit: you can completely change how balance is stored internally (say, storing it in cents instead of dollars) without breaking any code that uses BankAccount, because the public interface stays the same.

```typescript
class BankAccount {
  private balance = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Must be positive");
    this.balance += amount;
  }

  getBalance() { return this.balance; }
}
```
**Key rule:** If a property can cause a bug when set from outside, make it private.



## 2. Abstraction
 Define what an object can do via an interface, and hide how it actually does it.

**Why this matters in practice:** When you write `checkout(processor)`, you shouldn't care whether it's Stripe, PayPal, or a mock for testing. Abstraction lets you write code against a contract, not a specific implementation. This is why your frontend doesn't break when the backend switches databases — if both sides agree on the interface, the internals can change freely.

It also makes testing much simpler. Instead of hitting a real payment API in tests, you inject a fake processor that implements the same interface. No network calls, no billing, full control.

```typescript
interface PaymentProcessor {
  process(amount: number): Promise<boolean>;
}
class StripeProcessor implements PaymentProcessor {
  async process(amount: number) { return true; }
}
async function checkout(p: PaymentProcessor) {
  await p.process(100); 
}
```

**Key rule:** Depend on interfaces, not concrete classes. If you ever write the class name as a type, ask yourself: should this be an interface instead?

---

## 3. Inheritance
 A child class extends a parent class, inheriting its properties and methods, and can override or add behavior.

**Why this matters in practice:** When two classes share a lot of behavior but differ in one or two specific ways, inheritance removes that duplication. The shared logic lives in one place — the parent. Fix a bug there, every subclass benefits automatically.

The `abstract` keyword is powerful here: it lets the parent define structure (every Animal must have `makeSound`) without defining behavior (the parent doesn't know what sound to make). This forces each subclass to be complete on its own.

```typescript
abstract class Animal {
  constructor(protected name: string) {}
  abstract makeSound(): void;

  describe() { console.log(`I am ${this.name}`); } 
}

class Dog extends Animal {
  makeSound() { console.log("Woof"); }
}
```

**Key rule:** Only use inheritance for genuine is-a relationships. A Dog is an Anima — that's real. A UserService is not a DatabaseHelper — that's abuse. Keep hierarchies 1–2 levels deep. Beyond that, use composition.


## 4. Polymorphism
 Different objects respond to the same method call in their own way. One function works on all of them without knowing which specific type it's dealing with.

**Why this matters in practice:** Without polymorphism, you'd write code like if shape is Circle... else if shape is Rectangle. Every time you add a new shape, you'd have to find every if-else block and update it. With polymorphism, you just add the new class — nothing else changes. This is the Open-Closed Principle in action: open for extension, closed for modification.

This is also why Next.js components work the way they do. A <Button> doesn't need to know if it's rendering a submit button or a nav link — it just calls its props and each variant handles the rest.

```typescript
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private r: number) {}
  area() { return Math.PI * this.r ** 2; }
}

class Rectangle implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

function printArea(shape: Shape) {
  console.log(shape.area().toFixed(2));
}
```

## Summary
**Encapsulation**  Hide and protect internal state Any code can corrupt your data. 
**Abstraction**  Expose intent, hide implementation Changing internals breaks everything.
**Inheritance**  Share behavior through hierarchy Duplicated logic across classes .
**Polymorphism** . One interface, many behaviors if-else chains that grow forever .

 These principles exist to solve real problems. Apply them when they reduce complexity — not just to look "correct."
