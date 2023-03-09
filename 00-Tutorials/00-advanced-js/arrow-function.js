class Person {
  constructor(name) {
    this.name = name;
  }

  printNameWithArrowFunc() {
    setTimeout(() => {
      // "this" is not redefine, it's using "this" in the scope where the function is defined.
      console.log("Arrow:", this.name);
    }, 100);
  }

  printNameWithFunc() {
    setTimeout(function () {
      // "this" is redefined and using its own
      console.log("Function", this.name);
    }, 100);
  }
}

const p = new Person("Batman");
p.printNameWithArrowFunc(); // => Batman
p.printNameWithFunc(); // => undefined
console.log(this.name); // => undefined
