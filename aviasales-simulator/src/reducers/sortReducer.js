/* eslint-disable default-param-last */
import {
  SORT_BY_CHEAPEST,
  SORT_BY_FASTEST,
  SORT_BY_OPTIMAL,
  RESET_SORTING,
} from '../actions/sortActions';

const initialState = {
  sortingCriteria: 'none',
};

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SORTING:
      return {
        ...state,
        sortingCriteria: 'none',
      };
    case SORT_BY_CHEAPEST:
      return {
        ...state,
        sortingCriteria: 'cheapest',
      };
    case SORT_BY_FASTEST:
      return {
        ...state,
        sortingCriteria: 'fastest',
      };
    case SORT_BY_OPTIMAL:
      return {
        ...state,
        sortingCriteria: 'optimal',
      };

    default:
      return state;
  }
};

export default sortReducer;
