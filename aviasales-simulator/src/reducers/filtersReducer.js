/* eslint-disable default-param-last */
import { SET_ALL_FILTERS, TOGGLE_FILTER } from '../actions/filtersActions';

const initialState = {
  all: true,
  none: true,
  one: true,
  two: true,
  three: true,
};

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_FILTERS: {
      return {
        all: action.payload,
        none: action.payload,
        one: action.payload,
        two: action.payload,
        three: action.payload,
      };
    }
    case TOGGLE_FILTER: {
      if (action.payload === 'all') {
        const value = !state.all;
        return {
          all: value,
          none: value,
          one: value,
          two: value,
          three: value,
        };
      }
      const newState = {
        ...state,
        [action.payload]: !state[action.payload],
      };
      const allActive = ['none', 'one', 'two', 'three'].every(
        (filter) => newState[filter],
      );
      return {
        ...newState,
        all: allActive,
      };
    }
    default:
      return state;
  }
}

export default filtersReducer;
