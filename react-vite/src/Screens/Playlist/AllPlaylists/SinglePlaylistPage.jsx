import { getPlaylistThunk } from "../../../redux/playlists";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import RemoveSong from '../RemoveSongModal'
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
                <div className="SinglePlaylistDiv">
                    <div className="SinglePlaylistInfo">
                        <img
                            src={playlist.playlist_image}
                            className="SinglePlaylistImg"
                        />
                        <h3 className="SinglePlaylistTitle">{playlist?.title}</h3>
                        <p className="SinglePlaylistArtist">{playlist?.owner?.username}</p>
                    </div>
                    <div className="songDivNoSongs">
                        <p className="NoSongP">No Songs</p>
                        <button
                            className='playlist-view songs-button'
                            type='button'
                            onClick={() => {
                                navigate('/songs/')
                            }}
                        >Add a song</button>
                    </div>
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
                                <div className="playlistSongContainer" key={song?.id}>
                                    <img src={song?.song_image} className="songImg"/>
                                    <div className="songInfo" onClick={() => navigate(`/songs/${song?.id}`)}>
                                        <h3 className="songTitle">{song?.title}</h3>
                                        <p className="songArtist">Artist: {song?.artist?.username}</p>
                                    </div>
                                    <OpenModalButton
                                        className="RemoveButton"
                                        modalComponent={<RemoveSong songId={song?.id}/>}
                                        buttonText={'Remove'}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    } else{
        if(playlist?.songs?.length === 0) {
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
                    <div className="songDivNoSongs">
                        <p className="NoSongP">No Songs</p>
                    </div>
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
