export const QUIZZES = {
  basics: [
    {q:'What does `let age: number = 32;` do?', options:['Declares a variable that can only ever hold a number','Converts age to a string','Defines a class','Is the same as `let age = "32"`'], correct:0, explain:'The `: number` annotation restricts that variable to numbers, so assigning a string later would be a compile error.'},
    {q:'Which is a valid way to type an array of strings?', options:['string[]','Array<string()>','[string]:array','string{}'], correct:0, explain:'`string[]` (or `Array<string>`) is how you annotate an array of strings.'}
  ],
  interfaces: [
    {q:'What symbol marks an interface property as optional?', options:['?','!','#','*'], correct:0, explain:'A trailing `?` on a property, like `email?: string`, makes it optional.'},
    {q:'What is the main use of an interface?', options:['Describing the shape of an object','Only describing classes','Running code at runtime','Replacing all functions'], correct:0, explain:"Interfaces describe what an object's properties and their types should be."}
  ],
  functions: [
    {q:"If you omit an argument for a parameter with a default value, what happens?", options:['The default value is used','TypeScript throws an error','undefined is returned instead','It fails to compile'], correct:0, explain:'Default parameter values are used automatically whenever the caller leaves that argument out.'},
    {q:'A parameter typed `(n: number) => number` describes...', options:['A function taking a number and returning a number','An array of numbers','A class constructor','An object with a number property'], correct:0, explain:'That syntax is a function type: it takes a number and returns a number.'}
  ],
  unions: [
    {q:'The `|` symbol between two types creates a...', options:['Union type','Intersection type','Generic type','Tuple'], correct:0, explain:'`number | string` means the value can be either a number or a string.'},
    {q:'The `&` symbol combines two types into one that has...', options:['All properties of both types','Either type, but not both','Neither type','Only the first type\u2019s properties'], correct:0, explain:'An intersection type (`A & B`) requires a value to satisfy both A and B at once.'}
  ],
  narrowing: [
    {q:'Which operator helps narrow `number | string` inside an if statement?', options:['typeof','sizeof','keyof','new'], correct:0, explain:'`typeof value === "number"` lets TypeScript know value is a number inside that branch.'},
    {q:'After `if (typeof value === "string")`, TypeScript treats value as a...', options:['string','number','boolean','union of both'], correct:0, explain:'Inside that branch, the type has been narrowed down to just string.'}
  ],
  enums: [
    {q:'By default, the first member of a numeric enum equals...', options:['0','1','undefined','"0"'], correct:0, explain:'Numeric enums start at 0 unless you assign a different starting value.'},
    {q:'String enums require you to...', options:['Assign every member a value explicitly','Use only numbers','Leave every value blank','Extend an interface'], correct:0, explain:'Unlike numeric enums, string enum members don\u2019t auto-increment, so each needs its own value.'}
  ],
  generics: [
    {q:'A generic function like `function first<T>(list: T[]): T` ...', options:['Works with any array type while keeping type safety','Only works with numbers','Behaves exactly like using `any`','Removes all type checking'], correct:0, explain:'The type parameter T is filled in per call, so you keep full type checking for whatever type you pass.'},
    {q:'What is `<T>` commonly called?', options:['A type parameter','A type guard','A decorator','An enum member'], correct:0, explain:'T is a placeholder type, filled in with a real type at each call site.'}
  ],
  utility: [
    {q:'What does `Partial<Todo>` produce?', options:['A version of Todo with every property optional','A version with every property required','A type with no properties','A single property picked from Todo'], correct:0, explain:'Partial wraps every property in `?`, making the whole shape optional.'},
    {q:'What does `Pick<Todo, "title">` create?', options:['A type with only the title property','A type with everything except title','An array of titles','A copy of the whole Todo type'], correct:0, explain:'Pick selects just the named properties from the source type.'}
  ],
  conditional: [
    {q:'Reinforcing generics: in `type Box<T> = { value: T }`, what is T?', options:['A type parameter','A runtime value','A decorator','A namespace'], correct:0, explain:'T is filled in with a concrete type wherever Box is used, e.g. Box<string>.'},
    {q:'In `T extends U ? X : Y`, if T is not assignable to U, the result is...', options:['Y','X','never','an error'], correct:0, explain:'Conditional types behave like a type-level ternary: the false branch (Y) is used when the check fails.'}
  ],
  mapped: [
    {q:'Reinforcing interfaces: mapped types build a new type by looping over a type\u2019s...', options:['Keys','Runtime values','Comments','File paths'], correct:0, explain:'A mapped type iterates the keys of an existing type with `[K in keyof T]`.'},
    {q:'What does `[K in keyof T]?: T[K]` do to each property?', options:['Makes it optional','Deletes it','Makes it a string','Makes it readonly'], correct:0, explain:'The `?` in a mapped type marks every resulting property as optional \u2014 this is how Partial is built.'}
  ],
  guards: [
    {q:'Reinforcing unions: a function like `pet is Cat` is called a...', options:['Type predicate','Type alias','Decorator','Enum'], correct:0, explain:'A type predicate return type tells TypeScript exactly what was proven true inside the if-branch.'},
    {q:'Custom type guards are especially useful for narrowing...', options:['Union types','Numbers only','Arrays only','Namespaces'], correct:0, explain:'They let you split a union type (like Cat | Dog) into its specific members.'}
  ],
  decorators: [
    {q:'Reinforcing interfaces & classes: decorators are most commonly attached to...', options:['Classes and their members','Primitive values','Arrays','Union types'], correct:0, explain:'Decorators use `@` syntax on classes, methods, and properties to attach extra behavior.'},
    {q:'What must be enabled to use this legacy decorator syntax?', options:['experimentalDecorators','strictNullChecks','noImplicitAny','esModuleInterop'], correct:0, explain:'The `experimentalDecorators` compiler option turns on support for the `@decorator` syntax used here.'}
  ],
  'type-manip': [
    {q:'Reinforcing interfaces: `keyof Car` produces a union of...', options:["Car's property names","Car's values","Car's methods only","Nothing"], correct:0, explain:'`keyof` turns the keys of a type into a union of string literal types, e.g. "make" | "year".'},
    {q:'`typeof config` in a type position gives you...', options:['The inferred type of the config value','The runtime string "object"','A compile error','A namespace'], correct:0, explain:'`typeof` in a type position reads off the type TypeScript already inferred for that value.'}
  ],
  compatibility: [
    {q:'Reinforcing interfaces: TypeScript compares object types mainly by...', options:['Their shape (structural typing)','Their declared name','Which file they\u2019re in','Alphabetical order'], correct:0, explain:'Two types are compatible if their shapes line up, regardless of what they\u2019re called.'},
    {q:'Passing an object literal with extra properties directly to a typed parameter...', options:['Is flagged by excess property checks','Is always allowed silently','Is always an error, no exceptions','Is ignored entirely'], correct:0, explain:'TypeScript runs a stricter check on object literals passed directly, catching typos in extra properties.'}
  ],
  namespaces: [
    {q:'Reinforcing interfaces & exports: the standard way to share code between files today is...', options:['ES modules (import/export)','Namespaces','Global variables','Decorators'], correct:0, explain:'Modules are the modern, recommended way to organize TypeScript code across files.'},
    {q:'To use a function from inside a namespace elsewhere, it must be...', options:['Exported','Private','Generic','A decorator'], correct:0, explain:'Only `export`ed members of a namespace are reachable from outside it, like `Validation.isPositive`.'}
  ],
  symbols: [
    {q:'Reinforcing basics: which of these is a JavaScript primitive type?', options:['symbol','interface','enum','namespace'], correct:0, explain:'symbol joins string, number, boolean, etc. as a built-in JavaScript primitive.'},
    {q:'A common reason to use a symbol as an object key is to...', options:['Avoid naming collisions','Force it to be a string','Make the property optional','Disable type checking'], correct:0, explain:'Symbols are always unique, so they can\u2019t accidentally clash with another property key.'}
  ],
  iterators: [
    {q:'Reinforcing functions: a generator function is declared with a...', options:['* after function','! after function','# before function','& after function'], correct:0, explain:'`function*` marks a function as a generator, letting it use `yield`.'},
    {q:'Inside a generator, which keyword produces the next value?', options:['yield','return','break','throw'], correct:0, explain:'`yield` pauses the generator and hands back one value at a time.'}
  ],
  errors: [
    {q:'Reinforcing narrowing: in a catch block, an error\u2019s type defaults to...', options:['unknown','any','Error','string'], correct:0, explain:'TypeScript types caught errors as `unknown` by default, so you must narrow before using them.'},
    {q:'Why extend the built-in Error class for a custom error?', options:['To carry extra context/fields','To disable stack traces','To turn it into a namespace','To remove the message property'], correct:0, explain:'Extending Error lets you add fields like `field` or `resource` while keeping normal Error behavior.'}
  ]
};