import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard" className="header-logo">
          <span className="logo-icon">👁️</span>
        </Link>
        <h1 className="header-title">Minder</h1>
      </div>
      <div className="header-avatar">
        <span className="avatar-icon">👤</span>
        <strong>User</strong>
      </div>
    </header>
  );
};
