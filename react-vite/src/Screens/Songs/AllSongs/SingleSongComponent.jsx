import "./SongsView.css"
import { useDispatch, useSelector } from "react-redux";
import { memo, useContext, useEffect } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import { NavLink } from "react-router-dom";
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import EditSongModal from "../Edit Song/EditSongModal";
import DeleteSongModal from "../DeleteSong/DeleteSongModal";

const SingleSongComponent = (song) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { setCurrentSong, setIsPlaying } = useContext(PlayerContext);
    song = song.song;
    console.log(song);

    return (
        <div className="songContainer">
            <NavLink to={`/songs/${song.id}`}>
                <h2>{song.title}</h2>
            </NavLink>
            <div>Description: {song.description}</div>
            <div>Genre: {song.genre}</div>
            <div>Artist: {song.artist.username}</div>
            <button onClick={() => {
                setIsPlaying(false);
                setCurrentSong()
                setCurrentSong(song);
                setIsPlaying(true);
            }}>Play</button>
            {user?.id === song.user_id &&
                <OpenModalButton
                    modalComponent={<EditSongModal song={song} />}
                    buttonText="Edit Song"
                />
            }
            {user?.id === song.user_id &&
                <OpenModalButton
                    modalComponent={<DeleteSongModal songId={song.id} />}
                    buttonText="Delete Song"
                />
            }
        </div>
    )
}


export default memo(SingleSongComponent);
