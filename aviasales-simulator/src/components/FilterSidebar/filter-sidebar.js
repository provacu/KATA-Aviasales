/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './filter-sidebar.scss';

function FilterSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Количество пересадок</h2>
      <label className="sidebar__label">
        <input className="sidebar__checkbox" type="checkbox" /> Все
      </label>
      <label className="sidebar__label">
        <input className="sidebar__checkbox" type="checkbox" /> Без пересадок
      </label>
      <label className="sidebar__label">
        <input className="sidebar__checkbox" type="checkbox" /> 1 пересадка
      </label>
      <label className="sidebar__label">
        <input className="sidebar__checkbox" type="checkbox" /> 2 пересадки
      </label>
      <label className="sidebar__label">
        <input className="sidebar__checkbox" type="checkbox" /> 3 пересадки
      </label>
    </div>
  );
}

export default FilterSidebar;
