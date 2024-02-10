import {forwardRef, memo, useCallback, useEffect, useRef} from 'react';

import Size from '../../../../../../models/Size';
import resizeCanvas from '../../utils/resizeCanvas';

interface Props {
  className?: string;
  onResize: (size: Size) => void;
}

function AutoResizableCanvas(
  props: Props,
  canvasRef: React.ForwardedRef<HTMLCanvasElement>
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onResize = useCallback(
    (size: Size) => {
      const container = containerRef.current;
      const canvas = typeof canvasRef == 'object' && canvasRef?.current;

      if (container && canvas) {
        resizeCanvas(canvas, size, window.devicePixelRatio);
        props.onResize(size);
      }
    },
    [props, canvasRef]
  );

  const onWindowResize = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      onResize({width: rect.width, height: rect.height});
    }
  }, [onResize]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  useEffect(onWindowResize, [onWindowResize]);

  return (
    <div
      className={props.className}
      style={{width: '100%', height: '100%'}}
      ref={containerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default memo(forwardRef(AutoResizableCanvas));
