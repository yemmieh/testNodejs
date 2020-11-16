const { TestScheduler } = require('jest')
const functions = require('../functions')

test('add 2 = 2 equal 4',()=>{
    expect(functions.add(2,2)).toBe(4);
})

test('add 2 = 2 equal 4',()=>{
    expect(functions.add(2,2)).not.toBe(5);
})

test('this should be null',()=>{
    expect(functions.isNull()).toBeNull();
})

//CHECK FOR TRUTHY & FALSY VALUES
//toBeNull matches only null
//toBeUndefined matches only undefined
//toBeDefined is the opposite of toBeUndefined
//toBeTruthy matches anything that an if statement treats as true
//toBeFalsy matches anything that an if statement treats as false