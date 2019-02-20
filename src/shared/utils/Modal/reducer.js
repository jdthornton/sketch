import * as types from './types';

const initialState = null
const modalReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case types.OPEN_MODAL:
            return payload
        case types.CLOSE_MODAL:
            return null
        default:
            return previousState;
    }
};

export default modalReducer;
