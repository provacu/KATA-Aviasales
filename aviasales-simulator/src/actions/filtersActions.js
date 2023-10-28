export const SET_ALL_FILTERS = 'SET_ALL_FILTERS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function setAllFilters(value) {
  return {
    type: SET_ALL_FILTERS,
    payload: value,
  };
}
export function toggleFilter(filterName) {
  return {
    type: TOGGLE_FILTER,
    payload: filterName,
  };
}
