import { stockReducer } from './setMACD'
import { simulatorParamsReducer } from './setSimulatorParams'
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  stockState: stockReducer,
  simulatorParamsState: simulatorParamsReducer
});