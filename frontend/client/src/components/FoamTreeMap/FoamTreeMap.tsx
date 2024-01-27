// eslint-disable-next-line
// @ts-nocheck because FoamTree lib doesn't provide typings
import FoamTree from '@carrotsearch/foamtree';
import {useCallback, useEffect, useRef, memo} from 'react';
import classes from './FoamTreeMap.module.css';
import buildFoamTreeMapData from './buildFoamTreeMapData';

interface Props {
  profile: Profile;
}

function FoamTreeMap(props: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const foamTreeRef = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    // FoamTree API reference:
    // https://get.carrotsearch.com/foamtree/latest/api/
    if (!FoamTree.supported) {
      alert("FoamTree doesn't support this browser");
    }

    foamTreeRef.current = new FoamTree({
      element: elementRef.current,

      layout: 'squarified',
      stacking: 'flattened',

      // use a simple fade in/out animation
      rolloutDuration: 0,
      pullbackDuration: 0,
      fadeDuration: 0,

      // use slightly lower than default border widths
      groupBorderWidth: 2,
      groupInsetWidth: 4,

      // draw up to six levels of groups and labels
      maxGroupLevelsDrawn: 6,
      maxGroupLabelLevelsDrawn: 6,

      groupExposureZoomMargin: -100,

      // other options
      pixelRatio: window.devicePixelRatio || 1,
      descriptionGroupSize: 0.05,
      groupMinDiameter: 0,
      groupExposureZoomMargin: 0.2,
      openCloseDuration: 50,
      maxLabelSizeForTitleBar: 0,
      groupFillType: 'plain',
      dataObject: buildFoamTreeMapData(props.profile),

      // handlers

      // zoom-in group on double click, instead of exposing it
      onGroupDoubleClick: function (e) {
        e.preventDefault();
        this.zoom(e.secondary ? this.get('dataObject') : e.group);
      },
    });
  }, []);

  const onWindowResize = useCallback(() => {
    if (foamTreeRef.current) {
      foamTreeRef.current.resize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return <div className={classes.root} ref={elementRef} />;
}

export default memo(FoamTreeMap);
