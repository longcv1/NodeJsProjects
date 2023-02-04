/*
    Timer (setTimeout / setInterval / Callbacks) |
    ||
    I/O (I.O callback)                           |
    ||                                              Microtask Queue (process.nextTick / promise callbacks)
    Check (setImmediate)                         |
    ||
    Close (close handlers)                       |

==>    Execution Order:
    1. Any callbacks in Microtask queue are executed. First, tasks in nextTick, then promise callbacks
    2. All callbacks within the Timer queue are executed.
    3. Callbacks in Microtask queue if present are executed
    4. All callbacks in I/O queue executed.
    5. Callbacks in Microtask queue if present are executed
    6. Callbacks in Check queue are executed.
    7. Callbacks in Microtask queue if present are executed
    8. Callbacks in Close queue are executed.

==>     Experiences:
    1. All callbacks in nextTick queue are executed BEFORE callbacks in promise queue
    2. Callbacks in MICROTASK queue are executed BEFORE callbacks in TIMER queue
    3. Callbacks in MICROTASK queue are executed BETWEEN the execution of callbacks in TIMER queue
    4. TIMER queue callbacks are executed FIFO order
    5. Callbacks in MICROTASK queue are executed BEFORE callbacks in I/O queue.
    6. When running setTimeout() with delay 0ms and an I/O async method or callbacks in CHECK queue
    , the order execution is not guaranteed.
    7. I/O polling happen in I/O queue. If setImmediate() present, it will be executed before I/O callbacks queue.
    8. Callbacks in MICROTASK queue are executed after in I/O callbacks and before CHECK queue
    9. Callbacks in MICROTASK queue are executed between CHECK queue callbacks
    10. Callbacks in CLOSE queue are executed after all callbacks in previous queues (TIMER, MICRO, I/O, CHECK) executed.
*/
const fs = require('fs');

// fs.readFile(__filename, ()=> {
//     console.log('read file 1');
// })

// Promise.resolve().then(()=>{
//     console.log("promise");
// });
// process.nextTick(() => console.log('nextTick'));

// Case 9.
setImmediate(() => console.log('setImmediate 1'));
setImmediate(() => {
    console.log('setImmediate 2');
    process.nextTick(() => console.log('nextTick inner setImmediate'));
    Promise.resolve().then(() => console.log('promise inner setImmediate'));
})
setImmediate(()=> console.log('setImmediate 3'));