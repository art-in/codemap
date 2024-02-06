export default interface IFoamTreeMapGroup {
  id?: string;
  label: string;
  weight?: number;
  groups?: Array<IFoamTreeMapGroup>;
}
