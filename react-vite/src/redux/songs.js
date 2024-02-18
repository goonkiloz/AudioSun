

const GET_ALL_SONGS = "songs/getAll";
const GET_SINGLE_SONG = "songs/getSingleSong"
const GET_CURRENT_USER_SONGS = "songs/getCurrentUser";
const PUT_SONG = "songs/putSong";
const POST_SONG = "songs/post";
const DELETE_SONG = "songs/delete";

const getSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
    }
};

const getSingleSong = (songId) => {
    return {
        type: GET_SINGLE_SONG,
        payload: songId
    }
}

const getCurrentUserSongs = (songs) => {
    return {
        type: GET_CURRENT_USER_SONGS,
        payload: songs
    }
};

const putSong = (songId) => {
    return {
        type: PUT_SONG,
        payload: songId
    }
}

const postSong = (song) => {
    return {
        type: POST_SONG,
        payload: song
    }
};

const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        payload: songId
    }
};

export const getSongsThunk = () => async (dispatch) => {
    const res = await fetch("/api/songs");
    const data = await res.json();
    dispatch(getSongs(data.songs))
};

export const getSingleSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`);
    const data = await res.json();
    dispatch(getSingleSong(data))
};

export const getCurrentUserSongsThunk = () => async (dispatch) => {
    const res = await fetch("/api/songs/current");
    const data = await res.json();
    dispatch(getCurrentUserSongs(data.songs))
};

export const putSongThunk = (song, songId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/songs/${songId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: song.title,
                genre: song.genre,
                description: song.description,
                file_path: song.filePath,
                privacy: song.privacy,
                // user_id: song.userId
            })
        });

        if (res.ok) {
            console.log(res);
            const updatedSong = await res.json();
            dispatch(putSong(updatedSong));
            dispatch(getCurrentUserSongsThunk());
            return res;
        }
        throw res
    } catch (e) {
        // const errors = await e.json();

        return e
    }
};

export const postSongThunk = (song) => async (dispatch) => {

    try {
        const res = await fetch("/api/songs/", {
            method: "POST",
            headers: {},
            body: song
        });

        if (res.ok) {
            // console.log(res)
            const newSong = await res.json();
            dispatch(postSong(newSong));
            dispatch(getCurrentUserSongsThunk());
            return {res, newSong}
        } else {
            return {res}
        }
    } catch (e) {
        // const errors = await e.json();

        return e
    }
};

export const deleteSongThunk = (songId) => async (dispatch) => {
    try {
        const res = await fetch(`api/songs/${songId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteSong(songId));
            dispatch(getCurrentUserSongsThunk());
            return data;
        }
        throw res;
    } catch (e) {
        return e;
    }
};

const initialState = { allSongs: [], byId: {}, currentUserSongs: [] };

const songsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SONGS:
            newState.allSongs = action.payload;
            action.payload.forEach(song => {
                newState.byId[song.id] = song;
            })
            return newState;
        case GET_SINGLE_SONG:
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case GET_CURRENT_USER_SONGS:
            newState.currentUserSongs = action.payload
            action.payload.forEach(song => {
                newState.byId[song.id] = song;
            })
            return newState;
        case PUT_SONG: {
            const index = newState.allSongs.findIndex(song => song.id === action.payload.id);
            newState.allSongs[index] = action.payload
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }
        case POST_SONG:
            newState.allSongs.push(action.payload)
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case DELETE_SONG:
            newState.allSongs = newState.allSongs.filter(
                (song) => song.id !== action.payload.songId
            );
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;
    }
}

export default songsReducer;
