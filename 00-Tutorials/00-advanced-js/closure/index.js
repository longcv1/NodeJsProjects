/**
 * Lexical scope defines how variables name are resolved in nested functions
 * Nested function have access to the scope of their parent functions.
 * What is closure?
 * ==> "A closure is a function having access to parent scope event after the parent function has closed/returned."
 * ==> Closure is created when we define a function not when a function is executed.
 */


// Lexical Scope example
// let x = 1;
// const parentFunc = () => {
//     let myValue = 2;
//     console.log(x);
//     console.log(myValue);

//     const childFunc = () => {
//         console.log(x+=5);
//     }
//     childFunc();
// }

// parentFunc();

// Closure example
// let x = 1;
// const parentFunc = () => {
//     let myValue = 2;
//     console.log(x);
//     console.log(myValue);

//     return childFunc = () => {
//         console.log(x+=5);
//     }
// }

// const result = parentFunc();
// result();
// result();

const consumeMoney = (person) => {
    let money = 5;
    return () => {
        --money;
        if(money === 0) console.log('out of money')
        else console.log(`${person} remains : ${money}`);
    }
}

const boy = consumeMoney('BOY');
boy();
boy();
boy();
const girl = consumeMoney('GIRL');
girl();