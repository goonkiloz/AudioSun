import { useDispatch, useSelector } from "react-redux"
import { getSongsThunk } from "../../../redux/songs"
import { memo, useEffect } from "react";
import "./SongsView.css";
import { NavLink } from "react-router-dom";
import AddSong from "../../Playlist/AddSongModal";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import { getCurrentUserPlaylistsThunk } from "../../../redux/playlists";
import SingleSongComponent from "./SingleSongComponent";

const SongsView = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs);
    console.log(songs);

    useEffect(() => {
        dispatch(getSongsThunk());
        dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch]);

    if (!songs) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Songs</h1>
            <div className="songsContainer">
                {songs.map((song) => (
                    <div key={song.id} className="songBox">
                        <SingleSongComponent song={song} />
                        <OpenModalButton
                            modalComponent={<AddSong songId={song.id} />}
                            buttonText={'Add to Playlist'}
                        />

                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(SongsView);
