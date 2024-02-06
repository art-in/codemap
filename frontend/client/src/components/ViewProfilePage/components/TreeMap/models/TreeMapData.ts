import BoundingRect from './BoundingRect';

export default interface TreeMapData {
  children?: Array<TreeMapNode>;
}

export interface TreeMapNode {
  label: string;
  weight: number;
  bounds: BoundingRect;
  labelBounds: BoundingRect;
  contentBounds: BoundingRect;
  color?: string;
  children?: Array<TreeMapNode>;
}
