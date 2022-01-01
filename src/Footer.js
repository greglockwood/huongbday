const config = [
  [0, 'Scratch at the text above to get rid of the cruft and reveal your present.'],
  [1, 'That\'s it!'],
  [10, 'So much cruft to go...'],
  [20, 'Scratch that text!'],
  [30, 'Scratch it good.'],
  [40, 'Almost half-way gone now'],
  [50, 'Woah-ah-oh, you\'re half-way there...'],
  [55, 'Woah-ah-oh, livin\' on a prayer-air...'],
  [60, 'Yes, I said "prayer-air". That\'s what it sounds like!'],
  [65, 'Getting there...'],
  [70, 'Keep going!'],
  [80, 'You can do it!'],
  [85, 'Have you figured it out yet?'],
  [90, 'Only a few erroneous words left now'],
  [95, 'So close! Make sure they\'re fully erased.'],
  [100, 'Done! Are you happy? I have already told the shelter.'],
];

function Footer({ progress }) {
  const prog = Math.min(100, progress * 100);
  let msg = '????';
  for (let len = config.length, i = len - 1; i >= 0; i--) {
    const [cutoff, text] = config[i];
    if (prog >= cutoff) {
      msg = text;
      break;
    }
  }
  return (
    <footer className="App-footer">
      {msg}
    </footer>
  );
}

export default Footer;
