import { getPlaylistSongsThunk, getPlaylistThunk, getPlaylistsThunk } from "../../../redux/playlists";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import RemoveSong from "../RemoveSongModal";


const SinglePlaylistView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const currentUser = useSelector(state => state.session?.user)
    const playlist = useSelector((state) => state.playlists?.currentPlaylist)
    const currentPlaylist = useSelector(state => state.playlists?.byId[playlistId])
    const currentPlaylistSongs = useSelector(state => state.playlists?.currentPlaylistSongs)

    useEffect(() => {
        dispatch(getPlaylistsThunk())
        dispatch(getPlaylistSongsThunk(playlistId))
        dispatch(getPlaylistThunk(playlistId))
        .then((res) => {
            if(!res.ok){
                navigate('*')
            }
        })

    }, [dispatch, playlistId, navigate])

    if(!playlist) return <h1>Loading ...</h1>


    return (
        <div className="playlistContainer">
            <h2>Title: {currentPlaylist?.title}</h2>
            {currentPlaylistSongs?.map((song) => (
                <div key={song?.id} className="playlistSongBox">
                    <NavLink to ={`/songs/${song?.id}`}>
                        {song?.title}
                    </NavLink>
                    {currentUser && (currentUser?.id === currentPlaylist?.user_id) && (
                    <OpenModalButton
                        modalComponent={<RemoveSong songId={song?.id} playlistId={playlist?.id}/>}
                        buttonText={'Remove'}
                    />
                    )}
                </div>
            ))}
        </div>
    )
}

export default SinglePlaylistView
