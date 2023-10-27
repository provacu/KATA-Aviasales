import React from 'react';
import './toggle-buttons.scss';

function ToggleButtons() {
  return (
    <div className="toggle">
      <button
        type="button"
        className="toggle__button"
        style={{ borderRadius: '5px 0 0 5px' }}
      >
        Самый дешевый
      </button>
      <button type="button" className="toggle__button">
        Самый быстрый
      </button>
      <button
        type="button"
        className="toggle__button"
        style={{ borderRadius: '0 5px 5px 0' }}
      >
        Оптимальный
      </button>
    </div>
  );
}

export default ToggleButtons;
