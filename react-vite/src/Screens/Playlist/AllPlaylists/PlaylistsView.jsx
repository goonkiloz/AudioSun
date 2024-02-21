import { useDispatch, useSelector } from "react-redux"
import { getPlaylistsThunk } from "../../../redux/playlists"
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./PlaylistsView.css"
import SinglePlaylistComponent from "./SinglePlaylistComponent";

const PlaylistsView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const playlists = useSelector(state => state.playlists.allPlaylists)

    useEffect(() => {
        dispatch(getPlaylistsThunk())
    }, [dispatch])

    if (!playlists) return <h1>Loading...</h1>

    return (
        <div className="playlistPage">
            <div className="playlistViewsDiv">
                <h1 className="playlist-header">Playlists</h1>
                <div className="playlistContainerDiv">
                    {playlists?.map((playlist) =>(
                        <div key={playlist.id} className="playlistBox">
                            <SinglePlaylistComponent playlist={playlist}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlaylistsView;
