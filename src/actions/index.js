import {
    SET_MACD_DATA
} from './actionTypes';

export const setMACD = value => ({
    type: SET_MACD_DATA,
    stockData: value
});