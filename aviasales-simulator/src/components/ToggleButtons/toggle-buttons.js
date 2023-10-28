import React, { useEffect } from 'react';
import './toggle-buttons.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortByCheapest,
  sortByFastest,
  sortByOptimal,
  resetSorting,
} from '../../actions/sortActions';

function ToggleButtons() {
  const dispatch = useDispatch();
  const currentSort = useSelector((state) => state.sort.sortingCriteria);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest('.toggle__button') ||
        event.target.closest('.sidebar') ||
        event.target.closest('.tickets__button') ||
        event.target.closest('.ticket-card')
      ) {
        return;
      }
      dispatch(resetSorting());
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="toggle">
      <button
        type="button"
        className={`toggle__button ${currentSort === 'cheapest' && 'active'}`}
        style={{ borderRadius: '5px 0 0 5px' }}
        onClick={() => dispatch(sortByCheapest())}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={`toggle__button ${currentSort === 'fastest' && 'active'}`}
        onClick={() => dispatch(sortByFastest())}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        className={`toggle__button ${currentSort === 'optimal' && 'active'}`}
        style={{ borderRadius: '0 5px 5px 0' }}
        onClick={() => dispatch(sortByOptimal())}
      >
        Оптимальный
      </button>
    </div>
  );
}

export default ToggleButtons;
