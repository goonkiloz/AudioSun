import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUserSongsThunk } from "../../redux/songs"
import OpenModalButton from "../Global/OpenModalButton/OpenModalButton";
import "./ProfileView.css";
// import { NavLink } from "react-router-dom";
import SingleSongComponent from "../Songs/AllSongs/SingleSongComponent";
import DeleteSong from "../Songs/DeleteSong/DeleteSongModal";
import EditSong from "../Songs/Edit Song/EditSongModal";

const ProfileView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const songs = useSelector(state => state.songs.currentUserSongs)
    // const currentSongs = songs.filter(song => song.user_id === user.id);


    useEffect(() => {
        dispatch(getCurrentUserSongsThunk());
    }, [dispatch]);

    if (!user) return <Navigate to="/login" replace={true} />;
    // if (!currentSongs) currentSongs = songs.filter(song => song.userId === user.id)
    if (!songs) return <h1>Loading...</h1>

    if(songs.length === 0) {
        return (
            <div>
                <h1>Songs</h1>
                <div className="songsContainer">
                <p>Upload a song!</p>
                <button
                className='add-song confirm-button'
                type='button'
                onClick={() => {
                    navigate('/songs/new')
                }}
                >Yes</button>
                </div>
            </div>
        )
    }

    return (
        <div className='current-user-songs-container'>
            <h1>My Songs</h1>
            <div className="current-user-songs-map">
                {songs?.map((song) => (
                    <div key={song.id} className="current-user-song">
                        <SingleSongComponent song={song} />

                        <div className="current-user-song-buttons">

                            <OpenModalButton
                                modalComponent={<EditSong song={song}/>}
                                buttonText={'Edit'}
                            />
                            <OpenModalButton
                                modalComponent={<DeleteSong songId={song.id}/>}
                                buttonText={'Delete'}
                            />
                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(ProfileView);
