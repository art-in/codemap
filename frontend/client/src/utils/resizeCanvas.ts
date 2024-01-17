import Size from '../models/Size';

export default function resizeCanvas(
  canvas: HTMLCanvasElement,
  size: Size,
  pixelRatio: number
): void {
  // enlarge coordinate space while keeping target CSS size for DOM element,
  // so each coordinate point will map onto separate physical pixel, thus
  // avoiding blurry objects on high DPI displays
  canvas.width = size.width * pixelRatio;
  canvas.height = size.height * pixelRatio;

  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;
}
