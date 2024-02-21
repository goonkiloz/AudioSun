import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserPlaylistsThunk } from "../../../redux/playlists";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import EditPlaylist from "../EditPlaylist/EditPlaylistModal";
import DeletePlaylist from "../DeletePlaylist/DeletePlaylistModal";
import './CurrentUserPlaylistsPage.css'

const CurrentUserPlaylistsPage = () => {
    const dispatch = useDispatch();
    const currentUserPlaylists = useSelector((state) => state.playlists?.currentUserPlaylists)

    useEffect(() => {
        dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch])

    if(!currentUserPlaylists) return <h1>Loading...</h1>

    return (
        <div className="current-user-playlist-container">
            <div>
                <h1>My Playlists</h1>
            </div>

            <div className="current-user-playlist-map">
                {currentUserPlaylists?.map((playlist) => {
                    return(
                        <div className="current-user-playlist" key={playlist.id}>
                            <div>
                                <NavLink className="current-user-playlist-nav" to={`/playlists/${playlist.id}`}>
                                    <h2>{playlist.title}</h2>
                                    <img src={playlist?.playlist_image}/>
                                </NavLink>
                            </div>

                            <div className="current-user-playlist-description">Description: {playlist.description}</div>
                            <OpenModalButton
                            modalComponent={<EditPlaylist playlistId={playlist.id}/>}
                            buttonText={'Edit'}
                            />
                            <OpenModalButton
                            modalComponent={<DeletePlaylist playlistId={playlist.id}/>}
                            buttonText={'Delete'}
                            />
                        </div>
                    )
                })}
                <div>

                <div className="new-play-list-button-container">
                    <NavLink to={'/playlists/new'}>
                        <button className="new-playlist-button">Create a new Playlist</button>
                    </NavLink>
                </div>

            </div>
            </div>

        </div>
    )
}

export default CurrentUserPlaylistsPage
