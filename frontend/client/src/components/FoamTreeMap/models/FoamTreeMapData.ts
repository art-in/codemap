// FoamTree data model reference:
// https://get.carrotsearch.com/foamtree/latest/api/#dataObject
export default interface FoamTreeMapData {
  groups: Array<FoamTreeMapGroup>;
}

export interface FoamTreeMapGroup {
  id?: string;
  label: string;
  weight?: number;
  groups?: Array<FoamTreeMapGroup>;
}
