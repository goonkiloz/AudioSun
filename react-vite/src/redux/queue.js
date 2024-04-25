
const ADD_TO_QUEUE = "queue/add";
const PLAY_ONE = "queue/playOne";
const DELETE_FROM_QUEUE = "queue/delete";

const addToQueue = (songs) => {
    return {
        type: ADD_TO_QUEUE,
        payload: songs,
    }
};

const playOne = (song) => {
    return {
        type: PLAY_ONE,
        payload: song,
    }
};

const deleteFromQueue = (songId) => {
    return {
        type: DELETE_FROM_QUEUE,
        payload: songId,
    }
};


export const addToQueueThunk = (songs) => async (dispatch) => {
    dispatch(addToQueue(songs));
};

export const playOneThunk = (song) => async (dispatch) => {
    dispatch(playOne(song));
};

export const deleteFromQueueThunk = (songId) => async (dispatch) => {
    dispatch(deleteFromQueue(songId));
};

const initialState = { songs: [] };

const queueReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ADD_TO_QUEUE:
            newState.songs = [...newState.songs, ...action.payload];
            return newState;
        case PLAY_ONE:
            newState.songs = [...action.payload];
            return newState;
        case DELETE_FROM_QUEUE:
            newState.songs = newState.songs.filter(song => song.id !== action.payload);
            return newState;
        default:
            return state;
    }
};

export default queueReducer;
