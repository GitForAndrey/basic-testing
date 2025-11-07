// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCasesAdd = [
     { a: 5, b: 3, action: Action.Add, expected: 8 },
     { a: 1, b: 3, action: Action.Add, expected: 4 },
     { a: 5, b: 3, action: Action.Subtract, expected: 2 },
     { a: 0, b: 3, action: Action.Subtract, expected: -3 },
     { a: 5, b: 3, action: Action.Multiply, expected: 15 },
     { a: 0, b: 3, action: Action.Multiply, expected: 0 },
     { a: 6, b: 3, action: Action.Divide, expected: 2 },
     { a: 0, b: 3, action: Action.Divide, expected: 0 },
     { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
     { a: 1, b: 3, action: Action.Exponentiate, expected: 1 },
     { a: 3, b: 3, action: 'test', expected: null},
     { a: 1, b: 3, action: null, expected: null},
     { a: 3, b: 'test', action: Action.Add,  expected: null},
     { a: 1, b: null, action: Action.Add,  expected: null},
];

describe('simpleCalculator tests', () => {
  test.each(testCasesAdd)('should $action $a and $b to equal $expected', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action})).toBe(expected);
  });
});


