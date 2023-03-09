/**
 * 1. Functional Programming:
 * Functional programming (FP) is an approach to software development that uses pure functions to create maintainable software.
 * In other words, building programs by applying and composing functions.
 * 2. Pure function:
 * - Easy to test/debug
 * - Decoupled
 * - Could be added to you utility functions
 * - A pure function should have at least 1 param. Otherwises, it's same as "constant"
 * ==> Rules:
 *    +> The same input always has same output
 *    +> No side effects
 *    +> Always return something, if not => not pure function
 *
 */

const firstName = () => console.log('TEST');
// Impure example 1:
let x = 1;
const increment = () => x+1;
console.log(increment());

// Refactor:
const pureIncrement = (num) => num + 1;
console.log(pureIncrement());
console.log(x);

// Impure example 2:
const myArray = [1,2,3];
const addArray = (array, data) => {
    array.push(data);
    return array;
}
console.log(addArray(myArray, 4));
console.log(myArray);

// Refactor
const pureAddArray = (array, data) => {
    return [...array, data];
}
console.log(addArray(myArray, 5));
console.log(myArray);
