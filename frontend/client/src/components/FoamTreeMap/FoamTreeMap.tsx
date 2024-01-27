import {useCallback, useEffect, useRef, memo} from 'react';
import classes from './FoamTreeMap.module.css';
import buildFoamTree, {FoamTreeInstance} from './buildFoamTree';
import Profile from '../../models/Profile';
import assertNotEmpty from '../../utils/assertNotEmpty';

interface Props {
  profile: Profile;
}

function FoamTreeMap(props: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const foamTreeRef = useRef<FoamTreeInstance | null>(null);

  useEffect(() => {
    foamTreeRef.current = buildFoamTree(elementRef.current, props.profile);

    return () => {
      // unbind FoamTree from the canvas, otherwise it blocks hot module
      // replacement (HMR) in dev environment
      foamTreeRef.current?.dispose();
    };
  }, [props.profile]);

  const onWindowResize = useCallback(() => {
    foamTreeRef.current?.resize();
  }, []);

  const onWindowKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if (['Delete', 'Backspace'].includes(e.code)) {
      const foamTree = foamTreeRef.current;
      assertNotEmpty(foamTree);

      const selection = foamTree.get('selection');

      for (const group of selection.groups) {
        group.delete();
      }

      foamTree.customRedrawAfterDataChanged();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', onWindowKeyDown);
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('keydown', onWindowKeyDown);
    };
  }, [onWindowResize]);

  return <div className={classes.root} ref={elementRef} />;
}

export default memo(FoamTreeMap);
