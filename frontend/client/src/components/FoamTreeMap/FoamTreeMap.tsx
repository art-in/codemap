// eslint-disable-next-line
// @ts-nocheck because FoamTree lib doesn't provide typings
import {useCallback, useEffect, useRef, memo} from 'react';
import FoamTree from '@carrotsearch/foamtree';
import classes from './FoamTreeMap.module.css';
import buildFoamTreeMapData from './buildFoamTreeMapData';

interface Props {
  profile: Profile;
}

// FoamTree API reference: https://get.carrotsearch.com/foamtree/latest/api/
function FoamTreeMap(props: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!FoamTree.supported) {
      alert("FoamTree doesn't support this browser");
    }

    treeRef.current = new FoamTree({
      element: elementRef.current,
      layout: 'squarified',
      stacking: 'flattened',
      pixelRatio: window.devicePixelRatio || 1,
      groupMinDiameter: 0,
      rolloutDuration: 0,
      pullbackDuration: 0,
      fadeDuration: 0,
      groupExposureZoomMargin: 0.2,
      zoomMouseWheelDuration: 50,
      openCloseDuration: 50,
      groupFillType: 'plain',
      dataObject: buildFoamTreeMapData(props.profile),
    });
  }, []);

  const onWindowResize = useCallback(() => {
    if (treeRef.current) {
      treeRef.current.resize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return <div className={classes.root} ref={elementRef} />;
}

export default memo(FoamTreeMap);
