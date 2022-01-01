import { useState } from 'react';

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
  `.split(/\n/g).filter(Boolean).map((line, idx) => {
    return <Line text={line} key={idx} className={idx === 0 ? 'space-around' : null}/>;
  });
  return (
    <div className={`App step-${step}`} onClick={() => setStep((step + 1) % numSteps)}>
      <header className="App-header">{headerText}</header>
      <div className="App-content">
        {lines}
      </div>
      { step < numSteps - 1 ? <footer className="App-footer">Tap to reveal your present</footer> : null }
    </div>
  );
}

export default App;
