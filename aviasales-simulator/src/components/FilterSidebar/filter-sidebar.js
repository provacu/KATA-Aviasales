/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import { setAllFilters, toggleFilter } from '../../actions/filtersActions';
import './filter-sidebar.scss';

function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleFilterChange = (filterName) => {
    if (filterName === 'all') {
      dispatch(setAllFilters(!filters.all));
    } else {
      dispatch(toggleFilter(filterName));
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Количество пересадок</h2>
      <label className="sidebar__label">
        <Checkbox
          checked={filters.all}
          onChange={() => handleFilterChange('all')}
        >
          Все
        </Checkbox>
      </label>
      <label className="sidebar__label">
        <Checkbox
          checked={filters.none}
          onChange={() => handleFilterChange('none')}
        >
          Без пересадок
        </Checkbox>
      </label>
      <label className="sidebar__label">
        <Checkbox
          checked={filters.one}
          onChange={() => handleFilterChange('one')}
        >
          1 пересадка
        </Checkbox>
      </label>
      <label className="sidebar__label">
        <Checkbox
          checked={filters.two}
          onChange={() => handleFilterChange('two')}
        >
          2 пересадки
        </Checkbox>
      </label>
      <label className="sidebar__label">
        <Checkbox
          checked={filters.three}
          onChange={() => handleFilterChange('three')}
        >
          3 пересадки
        </Checkbox>
      </label>
    </div>
  );
}

export default FilterSidebar;
