const FORMAT_POSTFIXES = [
  {div: 1e9, postfix: 'B'}, // billions
  {div: 1e6, postfix: 'M'}, // millions
  {div: 1e3, postfix: 'K'}, // killos
];

export default function formatNumber(n: number): string {
  const c = FORMAT_POSTFIXES.find((c) => n >= c.div);

  if (c) {
    const rounded = floorToPrecision(n / c.div, 1);
    return `${rounded}${c.postfix}`;
  }

  return n.toString();
}

function floorToPrecision(n: number, fractionDigits: number): number {
  const div = 10 ** fractionDigits;
  return Math.floor(n * div) / div;
}
