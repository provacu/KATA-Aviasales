export const SORT_BY_CHEAPEST = 'SORT_BY_CHEAPEST';
export const SORT_BY_FASTEST = 'SORT_BY_FASTEST';
export const SORT_BY_OPTIMAL = 'SORT_BY_OPTIMAL';
export const RESET_SORTING = 'RESET_SORTING';

export const sortByCheapest = () => ({
  type: SORT_BY_CHEAPEST,
});

export const sortByFastest = () => ({
  type: SORT_BY_FASTEST,
});

export const sortByOptimal = () => ({
  type: SORT_BY_OPTIMAL,
});

export const resetSorting = () => ({
  type: 'RESET_SORTING',
});
