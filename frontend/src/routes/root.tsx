import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './root.module.css';

import hamburger from '@/assets/hamburger.svg';
import timer from '@/assets/timer.svg';
import settings from '@/assets/settings.svg';

// eslint-disable-next-line import/no-unresolved
import logo from '/logo.svg';

const NAVIGATION_ITEMS = [
  {
    label: 'TIMER',
    route: '/timer',
    icon: timer,
  },
  {
    label: 'ANALYTICS',
    route: '/analytics',
    icon: hamburger,
  },
  {
    label: 'SETTINGS',
    route: '/settings',
    icon: settings,
  },
];

const Root = () => {
  const [currentRoute, setCurrentRoute] = useState(NAVIGATION_ITEMS[0].route);

  // TODO: Refactor
  const renderRoutes = () => {
    return NAVIGATION_ITEMS.map((navItem) => {
      const { label, route, icon } = navItem;
      const isActiveRoute = currentRoute === route;
      return (
        <li key={label}>
          <Link
            onClick={() => setCurrentRoute(route)}
            className={`${styles.link} ${
              isActiveRoute ? styles.selected : styles.unselected
            }`}
            to={route}
          >
            <img src={icon} alt="icon" />
            {label}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <div className={styles.sidebar}>
        <img src={logo} className={styles.logo} alt="logo" />
        <nav className={styles.nav}>
          <ul className={styles.unorderedList}>{renderRoutes()}</ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
