type TimerType = 'Break' | 'Focus';

interface Props {
  seconds: number;
  timerNum: number;
}

const TimerDisplay = ({ seconds, timerNum }: Props) => {
  let timerType: TimerType = 'Break';
  if (timerNum % 2 === 0) {
    timerType = 'Focus';
  }

  // Each round has 2 timers - work timer, break timer
  const roundNumber =
    ((timerType === 'Focus' ? timerNum + 1 : timerNum) + 1) / 2;

  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  return (
    <div>
      <p>{`${timerType} #${roundNumber}`}</p>
      <h2>{`${minutes < 10 ? '0' + minutes : minutes}:${
        remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds
      }`}</h2>
    </div>
  );
};

export default TimerDisplay;
