import styles from './TimerHeader.module.css';

interface TaskSelectOption {
  label: string;
  value: string;
}

const TASKS: TaskSelectOption[] = [
  {
    value: 'none',
    label: 'Select a task',
  },
  {
    value: 'leetcode',
    label: 'Leetcode',
  },
  {
    value: 'job_apps',
    label: 'Job Applications',
  },
  {
    value: 'exercise',
    label: 'Exercise',
  },
  {
    value: 'personal_project',
    label: 'Personal Project',
  },
];

const TimerHeader = () => {
  const renderSelect = () => {
    return (
      <select name="" id="">
        {TASKS.map((task) => (
          <option key={task.value} value={`${task.value}`}>
            {task.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.container}>
      {renderSelect()}
      <h1>Timer Page!</h1>
    </div>
  );
};

export default TimerHeader;
