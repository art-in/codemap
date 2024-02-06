import Profile, {ProfileNode} from '../../../../models/Profile';
import Size from '../../../../models/Size';
import BoundingRect from './models/BoundingRect';
import TreeMapData, {TreeMapNode} from './models/TreeMapData';

const LABEL_HEIGHT = 16;
const NODE_PADDING = 5;

const NORMAL_COLOR = 'green';
const ATTENTION_COLOR = 'red';

// implements "squarified" treemap algorithm as described in [ref1] and [ref2]
// [ref1]: http://www.cs.umd.edu/hcil/treemap-history/index.shtml
// [ref2]: https://www.huy.dev/squarified-tree-map-reasonml-part-1-2019-03/
export default function buildTreeMap(
  profile: Profile,
  viewSize: Size
): TreeMapData {
  const rootNode = mapRecursively(profile);

  rootNode.bounds = {
    x: 0,
    y: 0,
    width: viewSize.width,
    height: viewSize.height,
  };

  layoutAndColorRecursively(rootNode, true);

  return rootNode;
}

function mapRecursively(node: ProfileNode): TreeMapNode {
  return {
    label: `${node.name} [${node.weight}]`,
    weight: node.weight,
    bounds: emptyBounds(),
    labelBounds: emptyBounds(),
    contentBounds: emptyBounds(),
    children: node.children?.map(mapRecursively),
  };
}

function layoutAndColorRecursively(node: TreeMapNode, isRoot = false) {
  if (isRoot) {
    // omit label area in root node
    node.contentBounds = {
      x: node.bounds.x + NODE_PADDING,
      y: node.bounds.y + NODE_PADDING,
      width: Math.max(0, node.bounds.width - 2 * NODE_PADDING),
      height: Math.max(0, node.bounds.height - 2 * NODE_PADDING),
    };
  } else {
    node.labelBounds = {
      x: node.bounds.x + NODE_PADDING,
      y: node.bounds.y + NODE_PADDING,
      width: Math.max(0, node.bounds.width - 2 * NODE_PADDING),
      height: LABEL_HEIGHT,
    };

    node.contentBounds = {
      x: node.bounds.x + NODE_PADDING,
      y: node.bounds.y + 2 * NODE_PADDING + LABEL_HEIGHT,
      width: Math.max(0, node.bounds.width - 2 * NODE_PADDING),
      height: Math.max(0, node.bounds.height - 3 * NODE_PADDING - LABEL_HEIGHT),
    };
  }

  if (node.children) {
    layoutNodes(node.children, node.contentBounds);
    colorNodes(node.children);

    node.children.forEach((n) => layoutAndColorRecursively(n));
  }
}

function layoutNodes(nodes: TreeMapNode[], bounds: BoundingRect) {
  const totalArea = bounds.width * bounds.height;
  const totalWeight = weightNodes(nodes);

  let nodesLeft = nodes;
  let currentGroup: TreeMapNode[] = [];
  let currentGroupBounds = bounds;

  while (true) {
    if (nodesLeft.length === 0) {
      sliceRect(currentGroupBounds, currentGroup);
      return;
    }

    const shortestEdge = Math.min(
      currentGroupBounds.width,
      currentGroupBounds.height
    );

    const nextNode = nodesLeft[0];
    const nextNodesLeft = nodesLeft.slice(1);

    // "squarification" aims to make rectangles with aspect ratio = 1 (square),
    // so we add new items to the group while average ratio of nodes aims to 1.
    // otherwise we start new group in rectangle area left after previous group
    if (
      doesAddingToGroupImproveAspectRatio(
        currentGroup,
        nextNode,
        shortestEdge,
        totalArea,
        totalWeight
      )
    ) {
      nodesLeft = nextNodesLeft;
      currentGroup = currentGroup.concat(nextNode);
    } else {
      const groupWeight = weightNodes(currentGroup);
      const nodesLeftWeight = weightNodes(currentGroup.concat(nodesLeft));

      const [groupBounds, boundsLeft] = splitRectInHalf(
        currentGroupBounds,
        groupWeight / nodesLeftWeight
      );

      sliceRect(groupBounds, currentGroup);

      currentGroup = [];
      currentGroupBounds = boundsLeft;
    }
  }
}

function doesAddingToGroupImproveAspectRatio(
  currentGroup: TreeMapNode[],
  nextNode: TreeMapNode,
  shortestEdge: number,
  totalArea: number,
  totalWeight: number
) {
  if (currentGroup.length === 0) {
    return true;
  } else {
    const nextGroup = currentGroup.concat(nextNode);
    return (
      maxAspectRatio(nextGroup, shortestEdge, totalArea, totalWeight) <=
      maxAspectRatio(currentGroup, shortestEdge, totalArea, totalWeight)
    );
  }
}

function maxAspectRatio(
  group: TreeMapNode[],
  shortestEdge: number,
  totalArea: number,
  totalWeight: number
) {
  if (group.length === 0) {
    throw Error('group is empty');
  }

  let minArea = Infinity;
  let maxArea = -Infinity;

  let groupArea = 0;

  for (let i = 0; i < group.length; ++i) {
    const nodeArea = totalArea * (group[i].weight / totalWeight);
    minArea = Math.min(minArea, nodeArea);
    maxArea = Math.max(maxArea, nodeArea);
    groupArea += nodeArea;
  }

  return Math.max(
    (Math.pow(shortestEdge, 2) * maxArea) / Math.pow(groupArea, 2),
    Math.pow(groupArea, 2) / (Math.pow(shortestEdge, 2) * minArea)
  );
}

// splits rectangle in two halfs, where first half is `fraction` of total area
function splitRectInHalf(
  bounds: BoundingRect,
  fraction: number
): [BoundingRect, BoundingRect] {
  const totalArea = bounds.width * bounds.height;
  const firstHalfArea = totalArea * fraction;

  let firstHalf: BoundingRect;
  let secondHalf: BoundingRect;

  if (bounds.width >= bounds.height) {
    firstHalf = {
      x: bounds.x,
      y: bounds.y,
      width: firstHalfArea / bounds.height,
      height: bounds.height,
    };

    secondHalf = {
      x: bounds.x + firstHalf.width,
      y: bounds.y,
      width: bounds.width - firstHalf.width,
      height: bounds.height,
    };
  } else {
    firstHalf = {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: firstHalfArea / bounds.width,
    };

    secondHalf = {
      x: bounds.x,
      y: bounds.y + firstHalf.height,
      width: bounds.width,
      height: bounds.height - firstHalf.height,
    };
  }

  return [firstHalf, secondHalf];
}

// slices rectangle for `nodes` along longest side
function sliceRect(bounds: BoundingRect, nodes: TreeMapNode[]) {
  const totalWeight = weightNodes(nodes);

  if (bounds.width >= bounds.height) {
    let currentX = bounds.x;
    for (let i = 0; i < nodes.length; ++i) {
      const node = nodes[i];
      node.bounds.x = currentX;
      node.bounds.y = bounds.y;
      node.bounds.width = bounds.width * (node.weight / totalWeight);
      node.bounds.height = bounds.height;
      currentX += node.bounds.width;
    }
  } else {
    let currentY = bounds.y;
    for (let i = 0; i < nodes.length; ++i) {
      const node = nodes[i];
      node.bounds.x = bounds.x;
      node.bounds.y = currentY;
      node.bounds.width = bounds.width;
      node.bounds.height = bounds.height * (node.weight / totalWeight);
      currentY += node.bounds.height;
    }
  }
}

function weightNodes(nodes: TreeMapNode[]): number {
  return nodes.reduce((acc, n) => acc + n.weight, 0);
}

function emptyBounds(): BoundingRect {
  return {x: 0, y: 0, width: 0, height: 0};
}

function colorNodes(nodes: TreeMapNode[]) {
  const total = weightNodes(nodes);

  nodes.forEach(
    (n) => (n.color = n.weight > total * 0.5 ? ATTENTION_COLOR : NORMAL_COLOR)
  );
}
