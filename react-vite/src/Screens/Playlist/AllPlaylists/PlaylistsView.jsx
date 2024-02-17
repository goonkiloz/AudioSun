import { useDispatch, useSelector } from "react-redux"
import { getPlaylistSongsThunk, getPlaylistsThunk } from "../../../redux/playlists"
import { useEffect } from "react";
// import "./PlaylistView.css";
import { NavLink } from "react-router-dom";

const PlaylistsView = () => {
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists.allPlaylists)

    useEffect(() => {
        dispatch(getPlaylistsThunk())
    }, [dispatch])

    if (!playlists) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Playlists</h1>
            <div className="playlistContaniner">
                {playlists.map((playlist) =>(
                    <div key={playlist.id} className="playlistBox">
                        <NavLink to={`/playlists/${playlist.id}`} onClick={async () => await dispatch(getPlaylistSongsThunk(playlist.id))}>
                            {playlist.title}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlaylistsView;
