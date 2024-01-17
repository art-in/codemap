import Profile, {ProfileNode} from '../../models/Profile';
import FoamTreeMapData, {FoamTreeMapGroup} from './models/FoamTreeMapData';

export default function buildFoamTreeMapData(
  profile: Profile
): FoamTreeMapData {
  return {
    groups: profile.children?.map(mapRecursively) || [],
  };
}

function mapRecursively(node: ProfileNode): FoamTreeMapGroup {
  return {
    label: `${node.name} [${node.weight}]`,
    weight: node.weight,
    groups: node.children?.map(mapRecursively),
  };
}
