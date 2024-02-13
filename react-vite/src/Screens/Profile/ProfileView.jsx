import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentSongsThunk } from "../../redux/songs"
import "./ProfileView.css";
import { NavLink } from "react-router-dom";

const ProfileView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const songs = useSelector(state => state.songs.currentUserSongs)
    // const currentSongs = songs.filter(song => song.user_id === user.id);


    useEffect(() => {
        dispatch(getCurrentSongsThunk());
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
                        <NavLink to={`/songs/${song.id}`}>
                            {song.title}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(ProfileView);
