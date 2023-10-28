import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ticketsReducer from '../reducers/ticketsReducer';
import filtersReducer from '../reducers/filtersReducer';
import sortReducer from '../reducers/sortReducer';

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  filters: filtersReducer,
  sort: sortReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
