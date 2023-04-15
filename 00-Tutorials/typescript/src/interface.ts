// Type alias vs interface:
// Example of type alias
type Point = {
   x: number;
   y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
   console.log("The coordinate's x value is " + pt.x);
   console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 10, y: 100 });

// Example of interface
interface Person {
   name: string;
   age: number;
};

function displayInfo(p : Person) {
   console.log("name: " + p.name);
   console.log("age " + p.age);
}

displayInfo({name: 'username', age: 30});

// What's the different:
// => KEY DISTINTION: a type cannot be re-opened to add new properties vs an interface which is always extendable.