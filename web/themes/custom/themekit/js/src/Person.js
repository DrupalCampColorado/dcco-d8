/**
 * @file
 *
 * DELETE ME!
 * Example Person class
 */

class Person {
  constructor(name) {
    // property assignment
    this.name = name;
  }

  // Class method
  sayName() {
    // Template strings
    return `My name is ${this.name}.`;
  }

  // Static method
  static greeting(name = 'World') {
    return `Hello, ${name}!`;
  }
}

export default Person;