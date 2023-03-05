const process = require('process');
const fs = require('fs');

const args = {
  '-h': displayHelp,
  '-r': readFile
}

function displayHelp() {
  console.log('Argument processor:'. args);
}

function readFile(file) {
  console.log('Reading:', file);
  fs.createReadStream(file).pipe(process.stdout);
}

if (process.argv.length > 0) {
  // process.argv.forEach(function(arg, index) {
  //   console.log(index + ": " + arg);
  // });
  console.log(process.argv.slice(2));
  if(process.argv.slice(2)[0] === '-r') {
    console.log('TO DEBUG--------------------------------------------', );
    readFile('test.txt');
  }
}
