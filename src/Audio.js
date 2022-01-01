import { useEffect, useRef } from 'react';

import { SCRATCH_AUDIO_URL } from './constants';

function Audio({ mouse, debug }) {
  const prevState = useRef({ playing: false });
  const sound = useRef(null);

  const wasPlaying = prevState.current.playing;
  const isDown = mouse.isDown;

  useEffect(() => {
    const sndRef = sound.current;
    (async () => {
      if (isDown && !wasPlaying) {
        prevState.current.playing = true;
        try {
          await sndRef.play();
        } catch (ex) {
          console.error('Error when playing:', ex);
        }
      } else if (!isDown && wasPlaying) {
        prevState.current.playing = false;
        try {
          await sndRef.pause();
        } catch (ex) {
          console.error('Error when pausing:', ex);
        }
      }
    })();
    return () => sndRef?.stop();
  }, [isDown, wasPlaying]);

  return <audio src={SCRATCH_AUDIO_URL} ref={sound} autoPlay={false} preload={'auto'} loop controls={debug} />
}

export default Audio;
