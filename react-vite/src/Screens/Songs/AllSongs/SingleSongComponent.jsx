import "./SingleSongComponent.css"
import { useSelector } from "react-redux";
import { memo, useContext } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import { NavLink } from "react-router-dom";
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import EditSongModal from "../Edit Song/EditSongModal";
import DeleteSongModal from "../DeleteSong/DeleteSongModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";

const SingleSongComponent = (song) => {
    // const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { setCurrentSong, setIsPlaying } = useContext(PlayerContext);
    song = song.song;

    return (
        <div className="songContainer">
            <div className="img-buttons-container">
                <img src={song?.song_image} className="song-image" />
                <IconContext.Provider value={{
                    color: "red",
                    size: "70px"
                }}>
                    <FaPlay
                        className="play-button"
                        onClick={() => {
                            // setIsPlaying(false);
                            // setCurrentSong(null);
                            setCurrentSong(song);
                            // setIsPlaying(true);
                        }} />
                </IconContext.Provider>
                <IconContext.Provider value={{
                    color: "white",
                    size: "22px"
                }}>
                    <div className="options-menu">
                        <HiOutlineDotsHorizontal />
                    </div>
                </IconContext.Provider>
            </div>
            {user?.id === song?.user_id &&
                <OpenModalButton
                    modalComponent={<EditSongModal song={song} />}
                    buttonText="Edit Song"
                />
            }
            {user?.id === song?.user_id &&
                <OpenModalButton
                    modalComponent={<DeleteSongModal songId={song?.id} />}
                    buttonText="Delete Song"
                />
            }
            <NavLink to={`/songs/${song?.id}`} className={"title"}>
                <div>{song?.title}</div>
            </NavLink>
            <div>{song?.artist.username}</div>
        </div>
    )
}


export default memo(SingleSongComponent);
