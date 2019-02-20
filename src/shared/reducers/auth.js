export const LOAD_AUTH_DATA = 'LOAD_AUTH_DATA';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST__SUCCESS = 'TOKEN_REQUEST__SUCCESS';
export const TOKEN_REQUEST__FAILURE = 'TOKEN_REQUEST__FAILURE';
export const AUTHORIZATION_REQUEST = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_REQUEST__SUCCESS = 'AUTHORIZATION_REQUEST__SUCCESS';
export const AUTHORIZATION_REQUEST__FAILURE = 'AUTHORIZATION_REQUEST__FAILURE'

export const handleLoginRequest = payload => ({
  type: TOKEN_REQUEST,
  payload
})

const initialState = {user: null, isLoading: false, error: false, isOpen: false};

const authReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_AUTH_DATA:
            return {
              ...previousState,
              user: payload,
              isLoading: false
            }
        case AUTHORIZATION_REQUEST:
           return {
             ...previousState,
             isLoading: true
           }
        case AUTHORIZATION_REQUEST__SUCCESS:
            return {
              ...payload,
              isLoading: false
            }
        case AUTHORIZATION_REQUEST__FAILURE:
            return {
              ...previousState,
              isLoading: false
            }
        case TOKEN_REQUEST:
            return {
              ...previousState,
              isLoading: true
            }
        case TOKEN_REQUEST__SUCCESS:
            return {
              ...previousState,
              isLoading: false
            }
        case TOKEN_REQUEST__FAILURE:
            return {
              ...previousState,
              isLoading: false,
              error: true
            }
        default:
            return previousState;
    }
};

export default authReducer;
