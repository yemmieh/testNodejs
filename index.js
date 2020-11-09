const Person = require('./person')
const Logger = require('./logger');

const logger = new Logger();

logger.on('message',data => console.log('Called Listener',data))
logger.log('hello world')

//you g

// const person1 = new Person('yemi',3);
// person1.greetings();