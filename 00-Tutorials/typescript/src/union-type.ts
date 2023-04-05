// function formatCommandLine(input: any) {
//     let line = '';
//     if(typeof input === 'string') {
//         line = input.trim();
//     } else {
//         line = input.map(x => x.trim()).join(' ');
//     }
//     return line;
// }

// Solution: using union type
function formatCommandLine2(input: string | string[]) {
    let line = '';
    if(typeof input === 'string') {
        line = input.trim();
    } else {
        line = input.map(x => x.trim()).join(' ');
    }
    return line;
}

// console.log(formatCommandLine(['Hello ', ' world '])); // => OK
// console.log(formatCommandLine(12399)); // => Error at line 6 - map is not a function. Because type is "any"
console.log(formatCommandLine2(['Hello ', ' world '])); // => OK