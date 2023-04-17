"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const q = new Queue<number>;
// q.push(1);
// q.push(2);
// console.log(q);
// q.show();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('WELCOME TO TYPE SCRIPT');
});
app.listen(3000, () => console.log('Server started....'));
