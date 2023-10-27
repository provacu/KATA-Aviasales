/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import logoImage from './Logo.svg';
import './logo.scss';

function Logo() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogoClick();
    }
  };

  return (
    <div className="logo">
      <img
        src={logoImage}
        alt="logo"
        role="button"
        tabIndex="0"
        onClick={handleLogoClick}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Logo;
