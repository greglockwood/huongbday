import { useMemo, useRef } from 'react';

function ProgressBox({progress}) {
  const pathRef = useRef(null);
  let borderLen = (pathRef.current?.getTotalLength() ?? 0) + 5;
  const offsetToSet = Math.min(1, progress) * borderLen;
  const pathStyle = useMemo(() => {
    return {
      strokeDashoffset: borderLen - offsetToSet,
      strokeDasharray: `${borderLen},${borderLen}`,
    };
  }, [borderLen, offsetToSet]);
  return <svg viewBox='0 0 510 510' preserveAspectRatio='none'>
    <path d='M5,5 505,5 505,505 5,505 5,2.5' ref={pathRef} style={pathStyle} />
  </svg>;
}

export default ProgressBox;
