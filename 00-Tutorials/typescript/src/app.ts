// class Queue<T> {
//     private data: Array<T> = [];
//     push(item : T) : void {
//         this.data.push(item);
//     }
//     pop() : T | undefined {
//         return this.data.shift();
//     }
//     show() {
//         this.data.forEach(e => console.log(e));
//     }
// }

// const q = new Queue<number>;
// q.push(1);
// q.push(2);
// console.log(q);
// q.show();

import express from 'express'
const app = express();

app.get('/', (req, res) => {
    res.send('WELCOME TO TYPE SCRIPT');
})

app.listen(3000, () => console.log('Server started....'))