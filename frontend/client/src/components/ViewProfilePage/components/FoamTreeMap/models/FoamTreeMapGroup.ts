import assert from 'assert';

import formatNumber from '../../../../../utils/formatNumber';
import IFoamTreeMapGroup from './IFoamTreeMapData';

export default class FoamTreeMapGroup implements IFoamTreeMapGroup {
  parent?: FoamTreeMapGroup;
  groups: Array<FoamTreeMapGroup> = [];

  name = '';
  weight = 0;

  get label(): string {
    return `${this.name} [${formatNumber(this.weight)}]`;
  }

  delete() {
    this.parent?.deleteChildGroup(this);
    this.parent = undefined;
  }

  deleteChildGroup(childGroup: FoamTreeMapGroup) {
    const childIdx = this.groups.indexOf(childGroup);
    assert(childIdx >= 0, 'child group is not found');
    this.groups.splice(childIdx, 1);

    this.onChildGroupDeleted(childGroup.weight);
  }

  onChildGroupDeleted(deletedChildGroupWeight: number) {
    if (this.groups.length === 0) {
      this.delete();
    } else {
      this.weight -= deletedChildGroupWeight;
      this.parent?.onChildGroupDeleted(deletedChildGroupWeight);
    }
  }
}
