class greetFunc {
  constructor() {
    this.word = 'Greeting 3...';
    this.greet = function() {
      console.log(this.word);
    }
  }
}

module.exports = new greetFunc();