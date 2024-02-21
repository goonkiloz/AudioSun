import { getPlaylistThunk } from "../../../redux/playlists";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './PlaylistsView.css'


const SinglePlaylistView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const currentUser = useSelector(state => state?.session?.user)
    const playlist = useSelector((state) => state?.playlists?.currentPlaylist)

    useEffect(() => {
        async function startDispatching() {
            const res = await dispatch(getPlaylistThunk(playlistId))
            if(!res.ok) {
                navigate('/*')
            }
        }

        startDispatching()
    }, [dispatch, playlistId, navigate])

    if(!playlist) return <h1>Loading ...</h1>

    if(currentUser && playlist?.user_id === currentUser?.id){
        if(playlist?.songs?.length === 0) {
            return (
                <div className="playlistContainer">
                    <h2>{playlist?.title}</h2>
                    <p>No songs currently in playlist, add songs to see them here!</p>
                    <button
                    className='playlist-view songs-button'
                    type='button'
                    onClick={() => {
                        navigate('/songs/')
                    }}
                    >Add a song</button>
                </div>
            )
        }else {
            return (
                <div className="playlistContainer">
                    <h2>{playlist?.title}</h2>
                    {/* {playlist?.songs?.map((song) => (
                        <div key={song?.id} className="playlistSongBox">
                            <SingleSongComponent song={song}/>
                            {currentUser && (currentUser?.id === playlist?.user_id) && (
                            <OpenModalButton
                                modalComponent={<RemoveSong songId={song?.id}/>}
                                buttonText={'Remove'}
                            />
                            )}
                        </div>
                    ))} */}
                </div>
            )
        }
    } else{
        if(playlist?.songs?.length === 0) {
            return (
                <div className="playlistContainer">
                    <h2>Title: {playlist?.title}</h2>
                    <p>No Songs</p>
                </div>
            )
        }else {
            return (
                <div className="SinglePlaylistDiv">
                    <div className="SinglePlaylistInfo">
                        <img
                            src={playlist.playlist_image}
                            className="SinglePlaylistImg"
                        />
                        <h3 className="SinglePlaylistTitle">{playlist?.title}</h3>
                        <p className="SinglePlaylistArtist">{playlist?.owner?.username}</p>
                    </div>
                    <div className="songDiv">
                        {playlist?.songs?.map((song) => {
                            return(
                                <div className="playlistSongContainer" key={song?.id} onClick={() => navigate(`/songs/${song?.id}`)}>
                                    <img src={song?.song_image} className="songImg"/>
                                    <div className="songInfo">
                                        <h3 className="songTitle">{song?.title}</h3>
                                        <p className="songArtist">Artist: {song?.artist?.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}

export default SinglePlaylistView
