
/**
 * Tech-01: Creating and managing modules
 * => Problem: Break a project into separate files
 * => Solution: Use the exports object
 */

const req = require('express/lib/request');
const greet1 = require('./Tech1-modules/greet1');
greet1();

const greet2 = require('./Tech1-modules/greet2').greet;
greet2();

const greet3 = require('./Tech1-modules/greet3');
greet3.greet();

const greet4 = require('./Tech1-modules/greet4');
greet4.greet();

const greet5 = require('./Tech1-modules/greet5');
greet5.greet();

/**
 * Exports vs Module.exports
 * If using exports = function(), then the reference will be broken.
 * Just use module.exports or exports.your_function = function()
 */

/**
 * Tech-02: Loading a group of related modules
 * => Problem: Want to group related files together under a directory and only have to load it with one call require.
 * => Solution: Create a file called "index.js" to load each module and export them as a group, or add a package.json file
 * Example:
 * module.exports = {
    one: require('./one'),
    two: require('./two')
   };
 */

/**
 * Tech-03: Working with paths
 * => Problem: Want to access a file that isn't handled by the module system
 * => Solution: Use __dirname or __filename to determine the location of the file.
 */
console.log('directory: ',__dirname);
console.log('file name: ',__filename);

/**
 * Tech-04: Passing command-line arguments
 * => Problem: Your program needs to receive simple arguments from the command line
 * => Solution: Use process.argv
 */

/**
 * Tech-05: Safety managing async APIs
 * => Problem: Want to write a method that returns an instance of EventEmitter or accepts a callback
 *       that sometimes make an async API call but not in all cases
 * => Solution: Use process.nextTick to wrap the synchronous operation
 *       The process.nextTick method allows to replace a callback at the head of the next cycle
 *       of the run loop, it’s more efficient than just using setTimeout with a zero delay argument.
 *       
 */
const EventEmitter = require('events').EventEmitter;
function operation() {
  const events = new EventEmitter();
  process.nextTick(function() {
    events.emit('success');
  })
  return events;
}

operation().on('success', () => console.log('SUCCESS...'));