export default function getCanvasFontString(
  size = 8,
  family = 'Arial',
  unit = 'px',
  weight?: string | number
): string {
  return `${weight ? `${weight} ` : ''}${size}${unit} ${family}`;
}
