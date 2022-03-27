import { stockReducer } from './setMACD'
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  stockState: stockReducer
});