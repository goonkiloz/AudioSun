
const ADD_TO_QUEUE = "queue/add";
const PLAY_ONE = "queue/playOne";
const PLAY_CURRENT = "queue/playCurrent";
const PAUSE_QUEUE = "queue/pause";
const DELETE_FROM_QUEUE = "queue/delete";
const PLAY_NEXT = "queue/playNext"

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

const playCurrent = () => {
    return {
        type: PLAY_CURRENT,
    }
};

const pauseQueue = () => {
    return {
        type: PAUSE_QUEUE,
    }
};

const deleteFromQueue = (songId) => {
    return {
        type: DELETE_FROM_QUEUE,
        payload: songId,
    }
};

const playNext = () => {
    return {
        type: PLAY_NEXT,
    }
};


export const addToQueueThunk = (songs) => async (dispatch) => {
    dispatch(addToQueue(songs));
};

export const playOneThunk = (song) => async (dispatch) => {
    dispatch(playOne(song));
};

export const playCurrentThunk = () => async (dispatch) => {
    dispatch(playCurrent());
};

export const pauseQueueThunk = () => async (dispatch) => {
    dispatch(pauseQueue());
};

export const deleteFromQueueThunk = (songId) => async (dispatch) => {
    dispatch(deleteFromQueue(songId));
};

export const playNextThunk = () => async (dispatch) => {
    dispatch(playNext());
};

const initialState = { songs: [], playing: false, currentSong: {} };

const queueReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ADD_TO_QUEUE:
            newState.songs = [...newState.songs, ...action.payload];
            newState.playing = newState.playing;
            newState.currentSong = newState.songs[0];
            return newState;
        case PLAY_ONE:
            newState.songs = [...action.payload];
            newState.playing = true;
            newState.currentSong = action.payload[0];
            return newState;
        case PLAY_CURRENT:
            newState.songs = [...newState.songs]
            newState.playing = true;
            return newState;
        case PAUSE_QUEUE:
            newState.songs = [...newState.songs]
            newState.playing = false;
            return newState;
        case DELETE_FROM_QUEUE:
            newState.songs = newState.songs.filter(song => song.id !== action.payload);
            return newState;
        case PLAY_NEXT:
            newState.songs = newState.songs.slice(1);
            newState.playing = true;
            newState.currentSong = newState.songs[0];
            return newState;
        default:
            return state;
    }
};

export default queueReducer;
