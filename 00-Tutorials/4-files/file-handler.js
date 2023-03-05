const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const filePath = path.join(__dirname, 'file.txt');

fs.readFile(filePath, 'utf-8', (err, data)=>{
  if(err) throw new Error('File not found');
  console.log(data);
});

const fileOps = async() => {
  try{
    //const data = await fsPromises.readFile(path.join(__dirname, 'file.txt'),'utf-8');
    //console.log('new way: ', data);
    fsPromises.readFile(path.join(__dirname, 'file.txt'),'utf-8').then(result => {
      console.log('result: ', result);
    })
  } catch (err) {
    console.log(err);
  }
}

fileOps();

process.on('uncaughtException', err => {
  console.error('uncaught error');
  process.exit(1)
})

/**
 * Tech-01: Working with locking file
 * => Problem: You want to lock a file to prevent processes from tampering with it
 * ==> Solution: Using Node's built in or 3rd modules (flock)
 *      1. Creating a lockfile using the exclusive flag
        2. Creating a lockfile using mkdir
 */

// Using flag
fs.open('config.lock', 'wx', function (err) {
   if (err) return console.error(err);
});
fs.writeFile('config.lock', process.pid, { flags: 'wx' }, function (err) {
   if (err) return console.error(err);
});

// Using mkdir
fs.mkdir('config.lock', function (err) {
   if (err) return console.error(err);
   fs.writeFile('config.lock/'+process.pid, function (err) {
      if (err) return console.error(err);
   });
});