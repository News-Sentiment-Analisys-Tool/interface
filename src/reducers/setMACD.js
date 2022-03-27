import { SET_MACD_DATA } from '../actions/actionTypes';

const initialState = {
    stockData: []
};

export const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MACD_DATA:
            return {
                ...state,
                stockData: action.stockData
            };
        default:
            return state;
    }
};