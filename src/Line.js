import { useEffect, useRef, useState } from 'react';

import { BLANK_LINE } from './constants';

const ERASE_DURATION_PER_CHAR = 200;
const REQUIRE_PRESS = true;

let idMap = new Map();
let id = 0;
const getId = (node, text) => {
  if (idMap.has(node)) return idMap.get(node);
  const nextId = `${id++}__${text}`;
  idMap.set(node, nextId);
  return nextId;
};

function Word({ text, mouse, onErase }) {
  // console.log(`Word: text=${text}`)
  const isBlank = text === BLANK_LINE;
  if (isBlank) {
    text = ' ';
  }
  const target = useRef(null);
  const [pressedTime, setPressedTime] = useState(0);
  const [erased, setErased] = useState(false);
  const rect = target.current?.getBoundingClientRect();
  const isDown = REQUIRE_PRESS ? mouse.isDown : true;
  const isOver = !rect
    ? false
    : mouse.clientX >= rect.left &&
    mouse.clientX <= rect.right &&
    mouse.clientY >= rect.top &&
    mouse.clientY <= rect.bottom;
  if (isDown && isOver && !pressedTime) {
    // console.log('Setting pressed time to now');
    setPressedTime(Date.now());
  } else if (!isDown && isOver && pressedTime) {
    setPressedTime(0);
  }

  useEffect(() => {
    let handle = requestAnimationFrame(() => {
      if (pressedTime && isDown && isOver && !erased) {
        const fadeNodes = Array.from(target.current.querySelectorAll('.fade'));
        const erasableCharCount = fadeNodes.map(n => n.textContent).join('').replace(/\W/g, '').length;
        let eraseDuration = ERASE_DURATION_PER_CHAR * erasableCharCount;
        const duration = Math.min(eraseDuration, Date.now() - pressedTime);
        const eraseProgress = duration / eraseDuration;
        fadeNodes.forEach(node => node.style.opacity = 1 - eraseProgress);
        onErase(getId(target, text), eraseProgress * erasableCharCount);
        if (eraseProgress === 1) setErased(true);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [isDown, isOver, pressedTime, erased, onErase, text]);

  const parts = text.split(/\*/g).filter(Boolean).map((part, idx) => {
    // console.log(`Word.map(${part}, ${idx})`);
    const partStartIdx = text.indexOf(part);
    const isAKeeper = text[partStartIdx - 1] === '*' && text[partStartIdx + part.length] === '*';
    return <span className={isAKeeper ? 'keep' : 'fade'} key={idx}>{part}</span>;
  });

  return <span ref={target} className={['word', isBlank ? 'blank' : null].filter(Boolean).join(' ')}>{parts}</span>;
}

function Line({ text, className, mouse, onErase }) {
  const elementRef = useRef();

  const words = text.split(/\s+/g);

  return (
    <div className={['line', className].filter(Boolean).join(' ')} ref={elementRef}>
      {words.map((w, i) => <Word text={w} key={i} mouse={mouse} onErase={onErase} />)}
    </div>
  )
}

export default Line;
