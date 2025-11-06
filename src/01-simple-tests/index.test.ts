// Uncomment the code below and write your tests
 import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Add })).toBe(8);
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Add })).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Subtract })).toBe(-3);
  });

  test('should multiply two numbers', () => {
     expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
     expect(simpleCalculator({ a: 0, b: 3, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Divide })).toBe(0);
  });

  test('should exponentiate two numbers', () => {
     expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(27);
     expect(simpleCalculator({ a: 1, b: 3, action: Action.Exponentiate })).toBe(1);
  });

  test('should return null for invalid action', () => {
   expect(simpleCalculator({ a: 3, b: 3, action: 'test' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'string', b: 3, action: Action.Add })).toBeNull();
  });
});
