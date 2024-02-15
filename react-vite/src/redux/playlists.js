
const GET_ALL_PLAYLISTS = "playlists/GET_ALL_PLAYLISTS"
const GET_ALL_PLAYLISTS_CURRENT_USER = "playlists/GET_ALL_PLAYLISTS_CURRENT_USER"
const GET_ALL_PLAYLISTS_BY_SONG_ID = "playlists/GET_ALL_PLAYLISTS_BY_SONG_ID"
const GET_PLAYLIST = "playlists/GET_PLAYLIST"
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const EDIT_PLAYLIST = "playlists/EDIT_PLAYLIST"
// const ADD_SONG = "playlists/ADD_SONG"
// const REMOVE_SONG = "playlists/REMOVE_SONG"
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

const getPlaylistsBySongId = (playlists, songId) => {
    return {
        type: GET_ALL_PLAYLISTS_BY_SONG_ID,
        payload: { playlists, songId }
    }
}

const getPlaylist = (playlist) => {
    return {
        type: GET_PLAYLIST,
        payload: playlist
    }
}

const postPlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        payload: playlist
    }
}

const putPlaylist = (playlistId) => {
    return {
        type: EDIT_PLAYLIST,
        payload: playlistId
    }
}

// const addSong = (playlistId, songId) => {
//     return {
//         type: ADD_SONG,
//         payload: { playlistId, songId }
//     }
// }

// const removeSong = (playlistId, songId) => {
//     return {
//         type: REMOVE_SONG,
//         payload: { playlistId, songId }
//     }
// }

// const removePlaylist = (playlistId) => {
//     return {
//         type: REMOVE_PLAYLIST,
//         payload: playlistId
//     }
// }

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

        if(res.ok) {
            const data = await res.json()
            dispatch(getPlaylist(data))
            return data
        }
    } catch (e) {
        return e;
    }

}

export const postPlaylistThunk = (playlist) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists`, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
               title: playlist.title,
               description: playlist.description,
               playlist_image: playlist.playlist_image,
               user_id: playlist.user_id
            })
        })

        if(res.ok) {
            const data = await res.json()
            dispatch(postPlaylist(data))
            return data
        }

    } catch (e) {
        return e;
    }

}

export const putPlaylistThunk = (playlist, playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                title: playlist.title,
                description: playlist.description,
                playlist_image: playlist.playlist_image
            })
        })

        if(res.ok) {
            const data = await res.json()
            dispatch(putPlaylist(data))
            return data
        }

    } catch (e) {
        return e;
    }

}

// export const addSongThunk = (playlistId, songId) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json"},
//             body: JSON.stringify({
//                 playlist_id: playlistId,
//                 song_id: songId
//             })

//         })

//         if(res.ok) {
//             const data = await res.json()
//             dispatch(addSong(data))
//             return data
//         }

//     } catch (e) {
//         return e;
//     }

// }

// export const removeSongThunk = (playlistId, songId) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
//             method: "DELETE"
//         })

//         if(res.ok) {
//             const data = await res.json()
//             dispatch(removeSong(songId, playlistId))
//             return data
//         }

//     } catch (e) {
//         return e;
//     }

// }

// export const removePlaylistThunk = (playlistId) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/playlists/${playlistId}`, {
//             method: "DELETE"
//         })

//         if(res.ok) {
//             const data = await res.json()
//             dispatch(removePlaylist(playlistId))
//         }

//     } catch (e) {
//         return e;
//     }

// }

const initialState = { allPlaylists: [], byId: {}, currentUserPlaylists: [], currentPlaylistSongs: []};

const playlistsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PLAYLISTS:
            newState.allPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            return newState
        case GET_ALL_PLAYLISTS_CURRENT_USER:
            newState.currentUserPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            return newState;
        case GET_ALL_PLAYLISTS_BY_SONG_ID:
            newState.allPlaylists = action.payload
            action.payload.forEach(playlist => {
                newState.byId[playlist.id] = playlist;
            });
            return newState;
        // case GET_PLAYLIST:
        //     newState.byId[playlist.id] = playlist;
        //     return newState;
        // case CREATE_PLAYLIST:
        //     newState.allPlaylists.push(action.payload)
        //     newState.byId[action.payload.id] = action.payload;
        //     return newState;
        // case EDIT_PLAYLIST:
        //     const index = newState.allPlaylists.findIndex(playlist => playlist.id === action.payload.id);
        //     newState.allPlaylists[index] = action.payload
        //     newState.byId[action.payload.id] = action.payload;
        //     return newState;
        // case ADD_SONG:
        //     newState.currentPlaylistSongs
        //     return newState;
        // case REMOVE_SONG:
        //     return newState;
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
