

const GET_ALL_SONGS = "songs/getAll";
const GET_SINGLE_SONG = "songs/getSingleSong"
const GET_CURRENT_USER_SONGS = "songs/getCurrentUser";
const POST_SONG = "songs/post";

const getSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
    }
};

const getSingleSong = (songs) => {
    return {
        type: GET_SINGLE_SONG,
        payload: songs
    }
}

const getCurrentUserSongs = (songs) => {
    return {
        type: GET_CURRENT_SONGS,
        payload: songs
    }
};

const postSong = (song) => {
    return {
        type: POST_SONG,
        payload: song
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

export const postSongThunk = (song) => async (dispatch) => {

    try {
        const res = await fetch("/api/songs/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: song.title,
                genre: song.genre,
                description: song.description,
                file_path: song.filePath,
                privacy: song.privacy,
                user_id: song.userId
            })
        });

        if (res.ok) {
            console.log("res ok");
            const newSong = await res.json();
            dispatch(postSong(newSong));
            return res;
        }
        throw res
    } catch (e) {
        // const errors = await e.json();

        return e
    }
};

const initialState = { allSongs: [], byId: {}, currentUserSongs: [] };

const songsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SONGS:
            newState.allSongs = action.payload
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
        case POST_SONG:
            newState.allSongs.push(action.payload)
            newState.byId[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default songsReducer;
