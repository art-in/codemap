import {memo, useCallback, useEffect, useState} from 'react';
import {useRef} from 'react';

import Profile from '../../../../models/Profile';
import Size from '../../../../models/Size';
import assertNotEmpty from '../../../../utils/assertNotEmpty';
import buildTreeMap from './buildTreeMap';
import AutoResizableCanvas from './components/AutoResizableCanvas';
import drawTreeMap from './drawTreeMap';

interface Props {
  profile: Profile;
}

function TreeMap(props: Props) {
  const [viewSize, setViewSize] = useState<Size | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onResize = useCallback((vs: Size) => setViewSize(vs), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && viewSize) {
      const treeMap = buildTreeMap(props.profile, viewSize);

      const ctx = canvas.getContext('2d');
      assertNotEmpty(ctx, 'Failed to get 2D rendering context');

      // scale context so internal canvas sizes match with document CSS sizes.
      // it assumes canvas's coordinate space was already multiplied by pixel
      // ratio (see resizeCanvas())
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      drawTreeMap(ctx, treeMap, viewSize);
    }
  }, [props.profile, viewSize]);

  return <AutoResizableCanvas ref={canvasRef} onResize={onResize} />;
}

export default memo(TreeMap);
