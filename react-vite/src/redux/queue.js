

const ADD_TO_QUEUE = "queue/add"

const addQueue = (song) => {
    return {
        type: ADD_TO_QUEUE,
        payload: song
    }
};

export const addQueueThunk = (song) => async (dispatch) => {
    dispatch(addQueue(song))
}

const initialState = { allSongs: [], byId: {} };

const queueReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_TO_QUEUE:
            newState.allSongs[newState.allSongs.length] = action.payload
            return newState
        default:
            return state;
    }
}

export default queueReducer;
