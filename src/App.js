import { useRef, useState } from 'react';
import useMouse from '@react-hook/mouse-position';

import Line from './Line';
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

  const lines = `
Happy birthday!
[blank]
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
  `.split(/\n/g).map(l => l.trim()).filter(Boolean).map((line, idx) => {
    return <Line text={line} key={idx} className={idx === 0 ? 'space-around' : null} mouse={mouse}/>;
  });
  return (
    <div className={`App step-${step}`} ref={target}>
      <header className="App-header">{headerText}</header>
      <div className="App-content">
        {lines}
      </div>
      { step < numSteps - 1
        ? <footer className="App-footer" onClick={() => setStep((step + 1) % numSteps)}>Tap to eliminate the cruft</footer>
        : null }
    </div>
  );
}

export default App;
