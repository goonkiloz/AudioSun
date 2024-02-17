import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserPlaylistsThunk } from "../../../redux/playlists";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import EditPlaylist from "../EditPlaylist/EditPlaylistModal";
import DeletePlaylist from "../DeletePlaylist/DeletePlaylistModal";

const CurrentUserPlaylistsPage = () => {
    const dispatch = useDispatch();
    const currentUserPlaylists = useSelector((state) => state.playlists?.currentUserPlaylists)

    useEffect(() => {
        dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch])

    if(!currentUserPlaylists) return <h1>Loading...</h1>

    return (
        <div>
            <h1>My Playlists</h1>
                <NavLink to={'/playlists/new'}>Create a new Playlist</NavLink>
            <div>
                {currentUserPlaylists?.map((playlist) => {
                    return(
                        <div key={playlist.id}>
                            <NavLink to={`/playlists/${playlist.id}`}>{playlist.title}</NavLink>
                            <p>{playlist.description}</p>
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
            </div>
        </div>
    )
}

export default CurrentUserPlaylistsPage
