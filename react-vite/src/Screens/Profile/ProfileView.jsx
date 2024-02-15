import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { getCurrentUserSongsThunk } from "../../redux/songs"
import "./ProfileView.css";
// import { NavLink } from "react-router-dom";
import SingleSongComponent from "../Songs/AllSongs/SingleSongComponent";

const ProfileView = () => {
    // const navigate = useNavigate();
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

    return (
        <div>
            <h1>Songs</h1>
            <div className="songsContainer">
                {songs.map((song) => (
                    <div key={song.id} className="songBox">
                        <SingleSongComponent song={song} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(ProfileView);
