import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Menu.css';

export const Menu: React.FC = () => {
  return (
    <nav className="menu">
      <ul className="menu-list">
        <li>
          <Link to="/dashboard" className="menu-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/rate-movie" className="menu-link">
            Rate Movies
          </Link>
        </li>
        <li>
          <Link to="/rate-tv" className="menu-link">
            Rate TV Shows
          </Link>
        </li>
      </ul>
    </nav>
  );
};
