import { useState } from 'react';
// import styles from './TimerPage.module.css';

// TODO: Refactor to Redux global store
const TIMERS = [25, 5, 25, 5, 25, 5, 25, 15] as const;
const INITIAL_TIMER_NUM: number = 0 as const;

const TimerPage = () => {
  const [timerNum, setTimerNum] = useState(INITIAL_TIMER_NUM);
  const [seconds, setSeconds] = useState(TIMERS[INITIAL_TIMER_NUM] * 60);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const startNextRound = () => {
    setTimerNum((prevTimerNum) => {
      const nextTimerNum = (prevTimerNum + 1) % TIMERS.length;
      setSeconds(TIMERS[nextTimerNum] * 60);
      return nextTimerNum;
    });
  };

  const countdown = () => {
    setSeconds((seconds) => {
      if (seconds === 0) {
        startNextRound();
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

  const handleResetClick = () => {
    stopTimer();
    setTimerNum(INITIAL_TIMER_NUM);
    setSeconds(TIMERS[INITIAL_TIMER_NUM] * 60);
  };

  const handlePlayPauseClick = () => {
    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleSkipClick = () => {
    startTimer();
    startNextRound();
  };

  const renderTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    return `${minutes < 10 ? '0' + minutes : minutes}:${
      remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds
    }`;
  };

  const timerType = (): 'Break' | 'Focus' => {
    let type: 'Break' | 'Focus' = 'Break';
    if (timerNum % 2 === 0) {
      type = 'Focus';
    }
    return type;
  };

  const renderDescription = () => {
    const roundNumber =
      ((timerType() === 'Focus' ? timerNum + 1 : timerNum) + 1) / 2;
    return `${timerType()} #${roundNumber}`;
  };

  return (
    <>
      <h1>Timer Page!</h1>
      <p>{renderDescription()}</p>
      <h2>{renderTime()}</h2>
      <button onClick={handlePlayPauseClick}>
        {!timer ? 'Play' : 'Pause'}
      </button>
      <button onClick={handleSkipClick}>Skip</button>
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
};

export default TimerPage;
