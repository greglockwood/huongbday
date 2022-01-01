import { useCallback, useMemo, useRef, useState } from 'react';
import useMouse from '@react-hook/mouse-position';

import Line from './Line';
import ProgressBox from './ProgressBox';
import Footer from './Footer';
import { BLANK_LINE } from './constants';
import './App.css';

function App() {
  const target = useRef(null);
  const mouse = useMouse(target);

  const allText = `
Happy birthday!
${BLANK_LINE}
*A*s I tend to do, I
*d*elayed everything, including
*o*rganising even your
*p*resent. But I wanted
*t*o make it up to you,
as I am prone to do
*s*o *o*ften *o*n *t*hese things*!*
I decided to eliminate most of
the cruft and just focus
on the essentials.
  `;
  const keepCharCount = useMemo(() => [...allText.matchAll(/\*[^\s]\*/g)].length, [allText]);
  const totalAlphaChars = useMemo(() => allText.replace(BLANK_LINE, '').replace(/\W/g, '').length, [allText]);
  const totalCharsToErase = totalAlphaChars - keepCharCount;

  const [eraseProgress, setEraseProgress] = useState(0);
  const erasedCharMap = useRef({});
  const onErase = useCallback((id, chars) => {
    if (!id || chars == null) return;
    // console.log(`onErase(${id}, ${chars}), erasedCharMap`, erasedCharMap.current);
    erasedCharMap.current[id] = chars;
    const totalErasedChars = [...Object.values(erasedCharMap.current)].reduce((sum, count) => sum + count, 0);
    const progress = totalErasedChars / totalCharsToErase;
    // console.log(`Erase progress: ${Math.floor(progress * 100)}%`);
    setEraseProgress(progress);
  }, [allText]);

  let headerText = eraseProgress === 0 ? 'To my beautiful wife,' : 'Your present is that we will...';

  const lines = allText.split(/\n/g).map(l => l.trim()).filter(Boolean).map((line, idx) => {
    return <Line text={line} key={idx} className={idx === 0 ? 'space-around' : null} mouse={mouse} onErase={onErase}/>;
  });

  return (
    <div className={`App`} ref={target}>
      <header className="App-header">{headerText}</header>
      <div className="App-content">
        <ProgressBox progress={eraseProgress} />
        {lines}
      </div>
      <Footer progress={eraseProgress} />
    </div>
  );
}

export default App;
