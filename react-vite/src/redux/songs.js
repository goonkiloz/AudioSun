import { createSelector } from 'reselect';

const GET_ALL_SONGS = "songs/getAll";
const POST_SONG = "songs/post";

const getSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
    }
}

const postSong = (song) => {
    return {
        type: POST_SONG,
        payload: song
    }
}

export const getSongsThunk = () => async (dispatch) => {
    const res = await fetch("api/songs");
    const data = await res.json();
    dispatch(getSongs(data.songs))
}

export const postSongThunk = (song) => async (dispatch) => {
    const res = await fetch('api/songs', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    });

    if (res.ok) {
        const newSong = await res.json();
        dispatch(postSong(newSong));
        return newSong;
    } else {
        const err = await res.json();
        return err;
    }
};

const selectSongs = (state) => state.songs;
export const selectSongsArray = createSelector(selectSongs, (songs) => Object.values(songs));
export const selectSongById = (id) => (state) => state.songs[id];

const initialState = {};

const songsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SONGS:
            action.payload.forEach(song => {
                newState[song.id] = song;
            })
            return newState;
        case POST_SONG:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default songsReducer;
