import { useEffect, useRef } from 'react';

import { SCRATCH_AUDIO_URL } from './constants';

function Audio({ mouse, debug }) {
  const prevState = useRef({ playing: false });
  const sound = useRef(null);

  const wasPlaying = prevState.current.playing;
  const isDown = mouse.isDown;

  useEffect(async () => {
    if (isDown && !wasPlaying) {
      prevState.current.playing = true;
      try {
        await sound.current.play();
      } catch (ex) {
        console.error('Error when playing:', ex);
      }
    } else if (!isDown && wasPlaying) {
      prevState.current.playing = false;
      try {
        await sound.current.pause();
      } catch (ex) {
        console.error('Error when pausing:', ex);
      }
    }
  }, [isDown]);

  return <audio src={SCRATCH_AUDIO_URL} ref={sound} autoPlay={false} preload={'auto'} loop controls={debug} />
}

export default Audio;
