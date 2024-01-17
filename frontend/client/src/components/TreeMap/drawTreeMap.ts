import Size from '../../models/Size';
import getCanvasFontString from '../../utils/getCanvasFontString';
import TreeMapData, {TreeMapNode} from './models/TreeMapData';

export default function drawTreeMap(
  ctx: CanvasRenderingContext2D,
  data: TreeMapData,
  viewSize: Size
) {
  ctx.clearRect(0, 0, viewSize.width, viewSize.height);
  data.children?.forEach((n) => drawRecursively(ctx, n));
}

function drawRecursively(ctx: CanvasRenderingContext2D, node: TreeMapNode) {
  ctx.save();

  // clip node region to avoid label overflow
  ctx.beginPath();
  ctx.rect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);
  ctx.clip();

  // bounds
  ctx.rect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);
  ctx.stroke();

  if (node.color) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = node.color;
    ctx.fillRect(
      node.bounds.x,
      node.bounds.y,
      node.bounds.width,
      node.bounds.height
    );
    ctx.restore();
  }

  // label
  ctx.font = getCanvasFontString(node.labelBounds.height, 'Consolas');
  ctx.fillText(
    node.label,
    node.labelBounds.x,
    node.labelBounds.y + node.labelBounds.height * 0.8
  );

  ctx.restore();

  node.children?.forEach((n) => drawRecursively(ctx, n));
}
