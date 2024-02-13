import { useDispatch, useSelector } from "react-redux"
import { getSongsThunk } from "../../../redux/songs"
// import { selectSongsArray } from "../../../redux/songs"
import { useEffect } from "react";
import SingleSongView from "./SingleSongView";
import "./SongsView.css";
import { NavLink } from "react-router-dom";

const SongsView = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs)
    console.log(songs);

    useEffect(() => {
        dispatch(getSongsThunk());
    }, [dispatch]);

    if (!songs) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Songs</h1>
            <div className="songsContainer">
                {songs.map((song) => (
                    <div key={song.id} className="songBox">
                        <NavLink to={`${song.id}`}>
                            <SingleSongView song={song} />
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SongsView;
