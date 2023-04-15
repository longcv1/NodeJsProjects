function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
      return " ".repeat(padding) + input;
    }
    return padding + input;
}

console.log(padLeft(2, 'abc'));

const logNumber : (i: number) => void = (i:number) => {
  console.log(i);
}

logNumber(9);