import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserPlaylistsThunk } from "../../../redux/playlists";

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
            <div>
                {currentUserPlaylists?.map((playlist) => {
                    return(
                        <div>
                            <h3>{playlist.title}</h3>
                            <p>{playlist.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CurrentUserPlaylistsPage
