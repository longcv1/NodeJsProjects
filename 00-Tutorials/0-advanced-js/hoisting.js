// var is hoisted but let/const is not
console.log(x); // => "undefined" because it hoisted. 
var x = 5;

console.log(y); // => error because it's not hoisted.
let y = 6;

// Function is hoisted but arrow function is not
func1();
function func1() {
    console.log("Function 1"); //=> still working because it's hoisted
}

func2()
const func2 = () => console.log("Function 2")   // => Error becuase it's NOT hoisted