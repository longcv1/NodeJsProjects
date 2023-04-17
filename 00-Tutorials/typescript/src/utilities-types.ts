/**
 * Partial<T> : transform required => optional
 */
interface StarShip {
   name: String,
   enable: boolean
}

const starShip = (id: number, s: Partial<StarShip>) => { };

starShip(1, {
   name: "Discovery",
})

/**
 * Required<T>: transform optional => required
 */

interface Vehicle {
   name?: String,
   type?: String,
}

const car = (id: number, v: Required<Vehicle>) => { }
car(2, { name: 'Camry', type: 'Sedan' });

/**
 * Readonly<T>: only to read
 */
interface Todo {
   title: string;
}

const todo: Readonly<Todo> = {
   title: "Delete inactive users",
};

//todo.title = "Hello"; // => Error

/**
 * Record<K, T>: used to map the properties of a type to another type.
 */
interface CatInfo {
   age: number;
   breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
   miffy: { age: 10, breed: "Persian" },
   boris: { age: 5, breed: "Maine Coon" },
   mordred: { age: 16, breed: "British Shorthair" },
};

/**
 * Pick<Type, Keys> Picking the set of properties Keys from Types
 */
interface Todo1 {
   title: string;
   description: string;
   completed: boolean;
}

type TodoPreview = Pick<Todo1, "title" | "completed">;

const todo1: TodoPreview = {
   title: "Clean room",
   completed: false,
};

/**
 * Omit<Type, Keys>: picking all properties from Type and then removing Keys
 */
interface Todo2 {
   title: string;
   description: string;
   completed: boolean;
   createdAt: number;
 }
  
 type TodoPreview1 = Omit<Todo2, "description">;
  
 const todo2: TodoPreview1 = {
   title: "Clean room",
   completed: false,
   createdAt: 1615544252770,
 };

