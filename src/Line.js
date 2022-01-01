import { useLayoutEffect, useRef } from 'react';

function Word({ text }) {
  // console.log(`Word: text=${text}`)
  if (text === '[blank]') text = ' ';

  const parts = text.split(/\*/g).filter(Boolean).map((part, idx) => {
    console.log(`Word.map(${part}, ${idx})`);
    const partStartIdx = text.indexOf(part);
    const isAKeeper = text[partStartIdx - 1] === '*' && text[partStartIdx + part.length] === '*';
    return <span className={isAKeeper ? 'keep' : 'fade'} key={idx}>{part}</span>;
  });

  return <span className='word'>{parts}</span>;
}

function Line({ text, className }) {
  const elementRef = useRef();

  const words = text.split(/\s+/g);

  return (
    <div className={['line', className].filter(Boolean).join(' ')} ref={elementRef}>
      {words.map((w, i) => <Word text={w} key={i} />)}
    </div>
  )
}

export default Line;
