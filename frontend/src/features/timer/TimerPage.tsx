import { useState } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerHeader from './TimerHeader';
// import styles from './TimerPage.module.css';

// TODO: Refactor
const TIMERS = [25, 5, 25, 5, 25, 5, 25, 15] as const;
const INITIAL_TIMER_NUM: number = 0 as const;

const TimerPage = () => {
  const [timerNum, setTimerNum] = useState(INITIAL_TIMER_NUM);
  const [seconds, setSeconds] = useState(TIMERS[INITIAL_TIMER_NUM] * 60);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const goToNextTimer = () => {
    setTimerNum((prevTimerNum) => {
      const nextTimerNum = (prevTimerNum + 1) % TIMERS.length;
      setSeconds(TIMERS[nextTimerNum] * 60);
      return nextTimerNum;
    });
  };

  const countdown = () => {
    setSeconds((seconds) => {
      if (seconds === 0) {
        goToNextTimer();
      }
      return seconds - 1;
    });
  };

  const startTimer = () => {
    if (timer) {
      stopTimer();
    }
    setTimer(setInterval(countdown, 1000));
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  const handlePlayPauseClick = () => {
    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleSkipClick = () => {
    goToNextTimer();
    startTimer();
  };

  const handleResetClick = () => {
    stopTimer();
    setTimerNum(INITIAL_TIMER_NUM);
    setSeconds(TIMERS[INITIAL_TIMER_NUM] * 60);
  };

  return (
    <>
      <TimerHeader />
      <TimerDisplay timerNum={timerNum} seconds={seconds} />
      <button onClick={handlePlayPauseClick}>
        {!timer ? 'Play' : 'Pause'}
      </button>
      <button onClick={handleSkipClick}>Skip</button>
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
};

export default TimerPage;
