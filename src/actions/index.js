import {
    SET_MACD_DATA,
    SET_SIMULATOR_PARAMS
} from './actionTypes';

export const setMACD = value => ({
    type: SET_MACD_DATA,
    stockData: value
});

export const setSimulatorParams = value => ({
    type: SET_SIMULATOR_PARAMS,
    value
})