import { Outlet, Link } from 'react-router-dom';

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
              <Link to={`/timer`}>Timer</Link>
            </li>
            <li>
              <Link to={`/tasks`}>Tasks</Link>
            </li>
            <li>
              <Link to={`/profile`}>Profile</Link>
            </li>
            <li>
              <Link to={`/settings`}>Settings</Link>
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
