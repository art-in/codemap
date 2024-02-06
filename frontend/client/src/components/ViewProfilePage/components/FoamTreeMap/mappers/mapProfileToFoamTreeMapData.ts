import Profile, {ProfileNode} from '../../../../../models/Profile';
import FoamTreeMapGroup from '../models/FoamTreeMapGroup';
import IFoamTreeMapData from '../models/IFoamTreeMapData';

export default function mapProfileToFoamTreeMapData(
  profile: Profile
): IFoamTreeMapData {
  const root = new FoamTreeMapGroup();
  root.groups =
    profile.children?.map((child) => mapRecursively(child, root)) || [];
  return root;
}

function mapRecursively(
  node: ProfileNode,
  parent: FoamTreeMapGroup
): FoamTreeMapGroup {
  const group = new FoamTreeMapGroup();

  group.name = node.name;
  group.weight = node.weight;
  group.parent = parent;

  if (node.children) {
    group.groups = node.children.map((child) => {
      return mapRecursively(child, group);
    });
  }

  return group;
}
