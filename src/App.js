import { useCallback, useMemo, useRef, useState } from 'react';
import useMouse from '@react-hook/mouse-position';

import Line from './Line';
import { BLANK_LINE } from './constants';
import './App.css';

function App() {
  const numSteps = 2;
  const [step, setStep] = useState(0);
  let headerText = '';
  switch (step) {
    case 0:
      headerText = 'Hi Huonga!';
      break;
    case 1:
      headerText = 'Your present is that we can...';
      break;
  }
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
  // console.log('Keep char count: ', keepCharCount, 'total alpha chars: ', totalAlphaChars, 'total chars to erase: ', totalCharsToErase);

  const [eraseProgress, setEraseProgress] = useState(0);
  const erasedCharMap = useRef({});
  const onErase = useCallback((id, chars) => {
    if (!id || chars == null) return;
    console.log(`onErase(${id}, ${chars}), erasedCharMap`, erasedCharMap.current);
    erasedCharMap.current[id] = chars;
    const totalErasedChars = [...Object.values(erasedCharMap.current)].reduce((sum, count) => sum + count, 0);
    const progress = totalErasedChars / totalCharsToErase;
    console.log(`Erase progress: ${Math.floor(progress * 100)}%`);
    setEraseProgress(progress);
  }, [allText]);

  const lines = allText.split(/\n/g).map(l => l.trim()).filter(Boolean).map((line, idx) => {
    return <Line text={line} key={idx} className={idx === 0 ? 'space-around' : null} mouse={mouse} onErase={onErase}/>;
  });

  return (
    <div className={`App step-${step}`} ref={target}>
      <header className="App-header">{headerText}</header>
      <div className="App-content">
        {lines}
      </div>
      <footer className="App-footer">
      { eraseProgress === 0
        ? 'Scratch at the text above to get rid of the cruft and reveal your present.'
          : `Erase progress: ${eraseProgress}`}
      </footer>
    </div>
  );
}

export default App;
