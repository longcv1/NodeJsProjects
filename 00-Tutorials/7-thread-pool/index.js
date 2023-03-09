const crypto = require('crypto');

const MAX_CALL = 5;

const start = Date.now();

for(let i = 0 ; i < MAX_CALL ; i++) {
    crypto.pbkdf2("password", "salt", 1000000, 512, "sha512", () => {
        console.log(`Hash: ${i+1}`, Date.now() - start);
    });
}