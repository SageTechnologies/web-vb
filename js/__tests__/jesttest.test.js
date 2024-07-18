const sum = require('../jesttest');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    });

test('adds 2 + 2 to equal 4', () => {
    expect(sum(2, 2)).toBe(4);
    });

test('adds -5 + 2 to equal -3', () => {
    expect(sum(-5, 2)).toBe(-3);
    });

test('adds 2 + 132 to equal 134', () => {
    expect(sum(2, 132)).toBe(134);
    });