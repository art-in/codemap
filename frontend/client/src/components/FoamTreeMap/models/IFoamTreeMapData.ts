import IFoamTreeMapGroup from './IFoamTreeMapGroup';

// FoamTree data model reference:
// https://get.carrotsearch.com/foamtree/latest/api/#dataObject
export default interface IFoamTreeMapData {
  groups: Array<IFoamTreeMapGroup>;
}
