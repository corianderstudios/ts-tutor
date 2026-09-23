export const TOPICS = [
  {id:'basics', group:'Fundamentals', title:'Basics & Type Annotations',
   desc:"TypeScript adds types on top of JavaScript. You annotate variables, parameters, and return values so the compiler can catch mistakes before your code ever runs.",
   examples:[
    {label:'Annotating variables', code:`let age: number = 32;
let name: string = "Ada";
let isActive: boolean = true;
let tags: string[] = ["dev", "ts"];`},
    {label:'Function parameter & return types', code:`function add(a: number, b: number): number {
  return a + b;
}`}
   ]},
  {id:'interfaces', group:'Fundamentals', title:'Interfaces & Type Aliases',
   desc:"Interfaces and type aliases describe the shape of an object. Use them so functions and variables agree on what data looks like, and get autocomplete and errors for free.",
   examples:[
    {label:'An interface', code:`interface User {
  id: number;
  name: string;
  email?: string; // optional
}

function greet(user: User): string {
  return "Hello, " + user.name;
}`},
    {label:'A type alias', code:`type Point = { x: number; y: number };

const origin: Point = { x: 0, y: 0 };`}
   ]},
  {id:'functions', group:'Fundamentals', title:'Functions',
   desc:"Functions can have optional parameters, default values, and typed callbacks. TypeScript checks that every call site passes the right shape of arguments.",
   examples:[
    {label:'Optional and default parameters', code:`function makeTag(text: string, size: number = 12): string {
  return \`<span style="font-size:\${size}px">\${text}</span>\`;
}`},
    {label:'Typed callback', code:`function fetchData(onDone: (result: string) => void) {
  onDone("finished");
}`}
   ]},
  {id:'unions', group:'Fundamentals', title:'Union & Intersection Types',
   desc:"A union type means a value can be one of several types. An intersection combines multiple types into one. Both are core to writing flexible, precise TypeScript.",
   examples:[
    {label:'Union type', code:`function printId(id: number | string) {
  console.log("Your ID is: " + id);
}`},
    {label:'Intersection type', code:`type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const p: Person = { name: "Sam", age: 40 };`}
   ]},
  {id:'narrowing', group:'Fundamentals', title:'Type Narrowing',
   desc:"Narrowing lets TypeScript figure out a more specific type inside a branch of code, usually with typeof, instanceof, or a simple truthy check.",
   examples:[
    {label:'typeof narrowing', code:`function format(value: number | string) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.trim();
}`}
   ]},
  {id:'generics', group:'Fundamentals', title:'Generics',
   desc:"Generics let you write a function or type that works with many types while still keeping full type safety, instead of falling back to 'any'.",
   examples:[
    {label:'A generic function', code:`function firstItem<T>(list: T[]): T {
  return list[0];
}

const num = firstItem<number>([1, 2, 3]);
const str = firstItem(["a", "b"]); // inferred`},
    {label:'A generic interface', code:`interface Box<T> {
  value: T;
}

const box: Box<string> = { value: "hello" };`}
   ]},
  {id:'utility', group:'Fundamentals', title:'Utility Types',
   desc:"TypeScript ships built-in helper types that transform other types, so you rarely need to redefine a shape from scratch.",
   examples:[
    {label:'Partial and Pick', code:`interface Todo {
  title: string;
  done: boolean;
}

type DraftTodo = Partial<Todo>;
type TitleOnly = Pick<Todo, "title">;`},
    {label:'Readonly', code:`interface Config {
  readonly apiKey: string;
}

const cfg: Config = { apiKey: "abc123" };
// cfg.apiKey = "x"; // Error: read-only`}
   ]},
  {id:'conditional', group:'Advanced', title:'Conditional Types',
   desc:"Conditional types pick one type or another based on a check, using the same syntax as a ternary but at the type level. Combined with 'infer', they can pull types out of other types.",
   examples:[
    {label:'A basic conditional type', code:`type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"`},
    {label:'Extracting with infer', code:`type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

function greet() { return "hi"; }
type G = ReturnOf<typeof greet>; // string`}
   ]},
  {id:'mapped', group:'Advanced', title:'Mapped Types',
   desc:"Mapped types build a new type by looping over the keys of an existing one, which is how utility types like Partial and Readonly are implemented under the hood.",
   examples:[
    {label:'A custom mapped type', code:`type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface Todo {
  title: string;
  done: boolean;
}

type OptionalTodo = Optional<Todo>;`},
    {label:'Mapping with a modifier', code:`type ReadonlyVersion<T> = {
  readonly [K in keyof T]: T[K];
};`}
   ]},
  {id:'guards', group:'Advanced', title:'Custom Type Guards',
   desc:"A function can tell the compiler exactly what it proved about a value by returning a 'value is Type' predicate, which is more powerful than a plain typeof or instanceof check.",
   examples:[
    {label:'A user-defined type guard', code:`interface Cat { meow(): void; }
interface Dog { bark(): void; }

function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

function speak(pet: Cat | Dog) {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}`}
   ]},
  {id:'decorators', group:'Advanced', title:'Decorators',
   desc:"Decorators attach behavior to a class or its members using an @ syntax. They're widely used by frameworks like Angular and NestJS to wire up metadata and dependency injection.",
   examples:[
    {label:'A simple class decorator', code:`function Logged(constructor: Function) {
  console.log("Created class: " + constructor.name);
}

@Logged
class Widget {
  constructor(public label: string) {}
}`}
   ]},
  {id:'enums', group:'Fundamentals', title:'Enums',
   desc:"An enum is a set of named constants. Use them for a fixed list of related values, like directions or statuses, instead of scattering raw strings or numbers through your code.",
   examples:[
    {label:'A numeric enum', code:`enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const move: Direction = Direction.Up;`},
    {label:'A string enum', code:`enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Closed = "CLOSED",
}

function isOpen(s: Status): boolean {
  return s !== Status.Closed;
}`}
   ]},
  {id:'type-manip', group:'Advanced', title:'Type Manipulation',
   desc:"Beyond defining types directly, TypeScript lets you derive new types from existing values and types using keyof, typeof, and indexed access.",
   examples:[
    {label:'keyof and indexed access', code:`interface Car {
  make: string;
  year: number;
}

type CarKeys = keyof Car;       // "make" | "year"
type YearType = Car["year"];    // number`},
    {label:'typeof in type position', code:`const config = { retries: 3, timeout: 1000 };

type Config = typeof config;
// { retries: number; timeout: number }`}
   ]},
  {id:'compatibility', group:'Advanced', title:'Type Compatibility',
   desc:"TypeScript uses structural typing: two types are compatible if their shapes match, regardless of name. This is often called 'duck typing'.",
   examples:[
    {label:'Structural compatibility', code:`interface Point2D { x: number; y: number; }

function logPoint(p: Point2D) {
  console.log(p.x + ", " + p.y);
}

const point3D = { x: 1, y: 2, z: 3 };
logPoint(point3D); // OK — has at least x and y`}
   ]},
  {id:'namespaces', group:'Advanced', title:'Namespaces & Modules',
   desc:"Modules (using import/export) are the standard way to organize modern TypeScript. Namespaces are an older way to group related code under a single name, still seen in some codebases.",
   examples:[
    {label:'ES modules', code:`// shapes.ts
export interface Circle { radius: number; }

// main.ts
import { Circle } from "./shapes";
const c: Circle = { radius: 5 };`},
    {label:'A namespace', code:`namespace Validation {
  export function isPositive(n: number): boolean {
    return n > 0;
  }
}

Validation.isPositive(4);`}
   ]},
  {id:'symbols', group:'Advanced', title:'Symbols',
   desc:"A symbol is a unique, immutable primitive value, often used as a collision-free object property key or to implement well-known protocols like iteration.",
   examples:[
    {label:'A unique property key', code:`const id = Symbol("id");

const user = {
  [id]: 12345,
  name: "Priya",
};

console.log(user[id]); // 12345`}
   ]},
  {id:'iterators', group:'Advanced', title:'Iterators & Generators',
   desc:"An iterator produces a sequence of values one at a time. A generator function, written with function*, is an easy way to build one using yield.",
   examples:[
    {label:'A generator function', code:`function* countTo(n: number): Generator<number> {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

for (const num of countTo(3)) {
  console.log(num);
}`}
   ]},
  {id:'errors', group:'Advanced', title:'Error Handling',
   desc:"TypeScript treats caught errors as 'unknown' by default, which forces you to check what you actually caught before using it. Custom error classes let you carry extra context.",
   examples:[
    {label:'Narrowing a caught error', code:`try {
  JSON.parse("not json");
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message);
  }
}`},
    {label:'A custom error class', code:`class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("email", "Email is required");`}
   ]}
];