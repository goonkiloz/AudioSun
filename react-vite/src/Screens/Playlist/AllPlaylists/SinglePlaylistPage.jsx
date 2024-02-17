import { getPlaylistSongsThunk, getPlaylistThunk, getPlaylistsThunk } from "../../../redux/playlists";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import RemoveSong from "../RemoveSongModal";


const SinglePlaylistView = () => {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const currentUser = useSelector(state => state.session.user)
    const currentPlaylist = useSelector(state => state.playlists?.byId[playlistId])
    const currentPlaylistSongs = useSelector(state => state.playlists?.currentPlaylistSongs)

    let parmCheck = Number(playlistId)

    useEffect(() => {
        dispatch(getPlaylistsThunk())
        dispatch(getPlaylistThunk(playlistId))
        dispatch(getPlaylistSongsThunk(playlistId))
    }, [dispatch, playlistId])


    if (isNaN(parmCheck)) return < Navigate to={"*"}/>

    return (
        <div className="playlistContainer">
            <h2>Title: {currentPlaylist?.title}</h2>
            {currentPlaylistSongs?.map((song) => (
                <div key={song.id} className="playlistSongBox">
                    <NavLink to ={`/songs/${song.id}`}>
                        {song.title}
                    </NavLink>
                    {currentUser && (currentUser.id === currentPlaylist.user_id) && (
                    <OpenModalButton
                        modalComponent={<RemoveSong songId={song.id} playlistId={currentPlaylist?.id}/>}
                        buttonText={'Remove'}
                    />
                    )}
                </div>
            ))}
        </div>
    )
}

export default SinglePlaylistView
