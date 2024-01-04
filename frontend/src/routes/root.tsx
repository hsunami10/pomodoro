import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <div id="sidebar">
        <h1>Pomodoro</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/timer`}>Timer</a>
            </li>
            <li>
              <a href={`/tasks`}>Tasks</a>
            </li>
            <li>
              <a href={`/profile`}>Profile</a>
            </li>
            <li>
              <a href={`/settings`}>Settings</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
