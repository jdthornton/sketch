export const OPEN_SOCKET = 'OPEN_SOCKET';
export const OPEN_SOCKET__SUCCESS = 'OPEN_SOCKET__SUCCESS';
export const CLOSE_SOCKET = "CLOSE_SOCKET";

export const actions = {
  loadSocket: payload => ({
      type: OPEN_SOCKET,
      payload
  }),

  closeSocket: () => ({type: CLOSE_SOCKET}),
};

const initialState = {isConnecting: true, connected: false};

const socketReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_SOCKET:
            return {
              ...previousState,
              isConnecting: true
            }
        case OPEN_SOCKET__SUCCESS:
            return {
              isConnecting: false,
              connected: true
            }
        case CLOSE_SOCKET:
            return {
              connected: false
            }
        default:
            return previousState;
    }
};

export default socketReducer;
