/**
 * Problem 1: You want to turn a Buffer into plain text
 * ==> Solution: Buffer API allows you to convert a buffer into a string value
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'test.txt');

fs.readFile(filePath, (err, buf)=>{
  console.log(buf.toString('ascii'));
})

/**
 * Problem 2: You want to change from one string encoding to another
 * ==> Solution: using Buffer API
 */

const user = 'john';
const pass = '12345';
const authString = user + ':' + pass;
let buf = new Buffer.from(authString);
const encoded = buf.toString('base64');
console.log(encoded);
