const lookupMatrix: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];

export const toRomanNumeral = (num: number) => {
  if (num < 1 || num > 3999) return 'Invalid input';

  return lookupMatrix.reduce((accumulator, [symbol, value]) => {
    accumulator += symbol.repeat(Math.floor(num / value));
    num %= value;
    return accumulator;
  }, '');
};
