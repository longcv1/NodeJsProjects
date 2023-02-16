const fsPromises = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'test.txt');
const writePath = path.join(__dirname, 'write.txt');

const fileOperations = async () => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        console.log("🚀 ~ file: index.js:9 ~ fileOperations ~ data", data);
        const written = await fsPromises.writeFile(writePath, data);
        if(written) console.log('\nWrite file successfully.....', written);
    } catch (error) {
        console.log("🚀 ~ file: index.js:10 ~ fileOperations ~ error", error);
    }
}

fileOperations();

// ********** Promise API ***********//
(async ()=> {
   try {
      await fsPromises.copyFile('test.txt', 'test-copied.txt');
   } catch (error) {
      console.log("🚀 ~ file: index.js:25 ~ error", error)
   }
})();

// ********** Callback API ***********//
fsPromises.copyFile('test.txt', 'test-copied.txt', (error) => {
   if(error){
      console.log("🚀 ~ file: index.js:32 ~ fsPromises.copyFile ~ error", error)
   }
   else {
      console.log('Copy file successfully');
   }
});

// ********** Synchronous API ***********//
const fs = require('fs');
fs.copyFileSync('test.txt', 'test-copied.txt');