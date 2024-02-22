import { Navigate } from "react-router-dom"

const GET_ALL_PLAYLISTS = "playlists/GET_ALL_PLAYLISTS"
const GET_ALL_PLAYLISTS_CURRENT_USER = "playlists/GET_ALL_PLAYLISTS_CURRENT_USER"
const GET_ALL_PLAYLISTS_BY_SONG_ID = "playlists/GET_ALL_PLAYLISTS_BY_SONG_ID"
const GET_PLAYLIST_SONGS = "playlists/GET_PLAYLIST_SONGS"
const GET_PLAYLIST = "playlists/GET_PLAYLIST"
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const EDIT_PLAYLIST = "playlists/EDIT_PLAYLIST"
const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST"

const getPlaylists = (playlists) => {
    return {
        type: GET_ALL_PLAYLISTS,
        payload: playlists
    }
}

const getCurrentUserPlaylists = (playlists) => {
    return {
        type: GET_ALL_PLAYLISTS_CURRENT_USER,
        payload: playlists
    }
}

const getPlaylistSongs = (payload) => {
    return {
        type: GET_PLAYLIST_SONGS,
        payload: payload.songs
    }
}

const getPlaylistsBySongId = (playlists, songId) => {
    return {
        type: GET_ALL_PLAYLISTS_BY_SONG_ID,
        payload: { playlists, songId }
    }
}

const getPlaylist = (payload) => {
    return {
        type: GET_PLAYLIST,
        payload: payload
    }
}

const postPlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        payload: playlist
    }
}

const putPlaylist = (playlist) => {
    return {
        type: EDIT_PLAYLIST,
        payload: playlist
    }
}

const removePlaylist = (playlistId) => {
    return {
        type: REMOVE_PLAYLIST,
        payload: playlistId
    }
}

export const getPlaylistsThunk = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists`)

        if(res.ok) {
            const data = await res.json()
            dispatch(getPlaylists(data.playlists))
            return data
        }

    } catch (e) {
        return e;
    }

}

export const getCurrentUserPlaylistsThunk = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/current`)

        if(res.ok) {
            const data = await res.json()
            dispatch(getCurrentUserPlaylists(data.playlists))
            return data
        }
    } catch (e) {
        return e;
    }

}

export const getPlaylistSongsThunk = (playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}/songs`)

        if(res.ok) {
            const data = await res.json()
            dispatch(getPlaylistSongs(data))
            return data
        }
    }catch (e) {
        return e;
    }
}

export const getPlaylistsBySongIdThunk = (songId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${songId}`)

        if(res.ok) {
            const data = await res.json()
            dispatch(getPlaylistsBySongId(data.playlists))
            return data
        }
    } catch (e) {
        return e;
    }

}

export const getPlaylistThunk = (playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}`)


        if(!res.ok) {
            const data = await res.json()
            return res
        }
        const data = await res.json()
        dispatch(getPlaylist(data))
        return res
    } catch (e) {
        return e;
    }

}

export const postPlaylistThunk = (playlist) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/`, {
            method: "POST",
            headers: {},
            body: playlist
        })

        if(res.ok) {
            const data = await res.json()
            dispatch(postPlaylist(data))
            return res
        } else {
            return res
        }

    } catch (e) {
        return e;
    }

}

export const putPlaylistThunk = (playlist, playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}`, {
            method: "PUT",
            headers: {},
            body: playlist
        })

        if(res.ok) {
            dispatch(putPlaylist(data))
            return res
        } else {
            return res
        }

    } catch (e) {
        return e;
    }

}

export const removePlaylistThunk = (playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}`, {
            method: "DELETE"
        })

        if(res.ok) {
            const data = await res.json()
            dispatch(removePlaylist(playlistId))
            return data
        }

    } catch (e) {
        return e;
    }

}

const initialState = { allPlaylists: [], byId: {}, currentUserPlaylists: [], currentPlaylistSongs: [], currentPlaylist: {}};

const playlistsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PLAYLISTS:
            newState.allPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            newState.currentPlaylist = {};
            newState.currentPlaylistSongs = [];
            return newState
        case GET_ALL_PLAYLISTS_CURRENT_USER:
            newState.currentUserPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            newState.currentPlaylist = {};
            newState.currentPlaylistSongs = [];
            return newState;
        case GET_PLAYLIST_SONGS:
            newState.currentPlaylistSongs = action.payload
            return newState;
        case GET_ALL_PLAYLISTS_BY_SONG_ID:
            newState.allPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            return newState;
        case GET_PLAYLIST:
            newState.currentPlaylist = action.payload.playlist;
            return newState;
        case CREATE_PLAYLIST:
            newState.allPlaylists.push(action.payload)
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case REMOVE_PLAYLIST:
            newState.allPlaylists = newState.allPlaylists.filter(
                (playlist) => playlist.id !== action.payload.playlistId
            );
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;

    }
  }

  export default playlistsReducer;
