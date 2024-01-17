import formatNumber from './formatNumber';

test('formatNumber', () => {
  const cases = [
    // no postfix
    {n: 0, expected: '0'},
    {n: 999, expected: '999'},

    // killos
    {n: 1000, expected: '1K'},
    {n: 1001, expected: '1K'},
    {n: 1100, expected: '1.1K'},
    {n: 1150, expected: '1.1K'},
    {n: 1999, expected: '1.9K'},
    {n: 999999, expected: '999.9K'},

    // millions
    {n: 1000000, expected: '1M'},
    {n: 1000001, expected: '1M'},
    {n: 1100000, expected: '1.1M'},
    {n: 1150000, expected: '1.1M'},
    {n: 1999999, expected: '1.9M'},
    {n: 999999999, expected: '999.9M'},

    // billions
    {n: 1000000000, expected: '1B'},
    {n: 1000000001, expected: '1B'},
    {n: 1100000000, expected: '1.1B'},
    {n: 1150000000, expected: '1.1B'},
    {n: 1999999999, expected: '1.9B'},
    {n: 999999999999, expected: '999.9B'},
  ];

  cases.forEach((c) => {
    expect(formatNumber(c.n)).toEqual(c.expected);
  });
});
