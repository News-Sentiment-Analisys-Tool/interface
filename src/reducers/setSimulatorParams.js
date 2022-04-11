import { SET_SIMULATOR_PARAMS } from '../actions/actionTypes';

const initialState = {
    simulatorParams: {}
};

export const simulatorParamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIMULATOR_PARAMS:
            return {
                ...state,
                simulatorParams: action.value
            };
        default:
            return state;
    }
};