// eslint-disable-next-line
// @ts-nocheck because FoamTree lib doesn't provide typings
import FoamTree from '@carrotsearch/foamtree';
import mapProfileToFoamTreeMapData from './mappers/mapProfileToFoamTreeMapData';
import Profile from '../../models/Profile';

// eslint-disable-next-line
export type FoamTreeInstance = Record<string, any>;

// FoamTree API reference:
// https://get.carrotsearch.com/foamtree/latest/api/
export default function buildFoamTree(
  element: HTMLDivElement | null,
  profile: Profile
): FoamTreeInstance {
  if (!FoamTree.supported) {
    throw new Error("FoamTree doesn't support this browser");
  }

  const foamTree = new FoamTree({
    element,

    layout: 'squarified',
    stacking: 'flattened',

    // use a simple fade in/out animation
    rolloutDuration: 0,
    pullbackDuration: 0,
    fadeDuration: 0,

    // use slightly lower than default border widths
    groupBorderWidth: 2,
    groupInsetWidth: 4,

    // draw all levels
    maxGroupLevelsDrawn: Infinity,
    maxGroupLabelLevelsDrawn: Infinity,
    maxGroupLevelsAttached: Infinity,

    // other options
    pixelRatio: window.devicePixelRatio || 1,
    descriptionGroupSize: 0.05,
    groupMinDiameter: 0,
    groupExposureZoomMargin: 0.2,
    openCloseDuration: 50,
    maxLabelSizeForTitleBar: 0,
    groupFillType: 'plain',
    dataObject: mapProfileToFoamTreeMapData(profile),

    // handlers

    // zoom-in group on double click, instead of exposing it
    onGroupDoubleClick: function (e) {
      e.preventDefault();
      this.zoom(e.secondary ? this.get('dataObject') : e.group);
    },
  });

  foamTree.customRedrawAfterDataChanged = () => {
    // ugly, but the only way found to redraw data after it was changed,
    // e.g. after nodes deleted
    foamTree.set('dataObject', foamTree.get('dataObject'));
  };

  return foamTree;
}
