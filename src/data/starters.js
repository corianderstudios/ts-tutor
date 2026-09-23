export const STARTERS = {
  basics: `type Point = { x: number; y: number };

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));`,
  interfaces: `interface Book {
  title: string;
  author: string;
  pages: number;
  read?: boolean;
}

function summarize(book: Book): string {
  const status = book.read ? "read" : "unread";
  return \`\${book.title} by \${book.author} (\${status})\`;
}

console.log(summarize({ title: "Dune", author: "Herbert", pages: 412 }));`,
  functions: `function repeat(text: string, times: number, separator: string = ", "): string {
  return Array(times).fill(text).join(separator);
}

function applyTwice(fn: (n: number) => number, value: number): number {
  return fn(fn(value));
}

console.log(repeat("ha", 3));
console.log(applyTwice(n => n * 2, 5));`,
  unions: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  return shape.width * shape.height;
}

console.log(area({ kind: "circle", radius: 2 }));
console.log(area({ kind: "rectangle", width: 3, height: 4 }));`,
  narrowing: `function describe(value: unknown): string {
  if (Array.isArray(value)) {
    return \`an array of \${value.length} items\`;
  }
  if (typeof value === "object" && value !== null) {
    return "an object";
  }
  return \`a \${typeof value}\`;
}

console.log(describe([1, 2, 3]));
console.log(describe("hello"));
console.log(describe({ a: 1 }));`,
  enums: `enum Priority {
  Low = 1,
  Medium,
  High,
}

function labelFor(p: Priority): string {
  return Priority[p];
}

const tasks: { name: string; priority: Priority }[] = [
  { name: "Fix bug", priority: Priority.High },
  { name: "Write docs", priority: Priority.Low },
];

tasks.forEach(t => console.log(t.name, "-", labelFor(t.priority)));`,
  generics: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  get size(): number {
    return this.items.length;
  }
}

const stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log(stack.pop(), stack.size);`,
  utility: `interface Employee {
  id: number;
  name: string;
  salary: number;
  department: string;
}

type PublicEmployee = Omit<Employee, "salary">;

function toPublic(emp: Employee): PublicEmployee {
  const { salary, ...rest } = emp;
  return rest;
}

console.log(toPublic({ id: 1, name: "Lee", salary: 90000, department: "Eng" }));`,
  conditional: `type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number>;   // number

function first<T>(list: T[]): ElementType<T[]> {
  return list[0] as ElementType<T[]>;
}

console.log(first([1, 2, 3]));`,
  mapped: `interface Settings {
  darkMode: boolean;
  fontSize: number;
}

type SettingsUpdater = {
  [K in keyof Settings as \`set\${Capitalize<string & K>}\`]: (value: Settings[K]) => void;
};

const updater: SettingsUpdater = {
  setDarkMode: v => console.log("dark mode:", v),
  setFontSize: v => console.log("font size:", v),
};

updater.setDarkMode(true);
updater.setFontSize(14);`,
  guards: `interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

move({ swim: () => console.log("swimming") });`,
  decorators: `function readonly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}

class Circle {
  @readonly
  pi = 3.14159;

  area(radius: number): number {
    return this.pi * radius * radius;
  }
}

console.log(new Circle().area(2));`,
  'type-manip': `interface ApiResponse {
  data: { id: number; name: string }[];
  status: number;
}

type DataItem = ApiResponse["data"][number];

function printItem(item: DataItem) {
  console.log(item.id, item.name);
}

printItem({ id: 1, name: "Widget" });`,
  compatibility: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

function printName(a: Animal) {
  console.log(a.name);
}

const dog: Dog = { name: "Rex", breed: "Lab" };
printName(dog); // Dog is compatible with Animal

const duck = { name: "Donald", quack: () => {} };
printName(duck); // extra properties are fine on a variable`,
  namespaces: `namespace Shapes {
  export interface Square {
    side: number;
  }

  export function area(sq: Square): number {
    return sq.side * sq.side;
  }
}

const sq: Shapes.Square = { side: 4 };
console.log(Shapes.area(sq));`,
  symbols: `const inventory = Symbol("inventory");

class Warehouse {
  [inventory]: string[] = [];

  add(item: string) {
    this[inventory].push(item);
  }

  list(): string[] {
    return this[inventory];
  }
}

const wh = new Warehouse();
wh.add("boxes");
wh.add("pallets");
console.log(wh.list());`,
  iterators: `class Range implements Iterable<number> {
  constructor(private start: number, private end: number) {}

  [Symbol.iterator](): Iterator<number> {
    let current = this.start;
    const end = this.end;
    return {
      next(): IteratorResult<number> {
        if (current < end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

for (const n of new Range(1, 5)) {
  console.log(n);
}`,
  errors: `class NotFoundError extends Error {
  constructor(public resource: string) {
    super(\`\${resource} was not found\`);
    this.name = "NotFoundError";
  }
}

function findUser(id: number) {
  if (id !== 1) {
    throw new NotFoundError(\`User \${id}\`);
  }
  return { id, name: "Ada" };
}

try {
  findUser(2);
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log("Caught:", err.message);
  }
}`
};