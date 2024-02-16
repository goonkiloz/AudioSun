import "./SongsView.css"
// import CommentsView from "../../Comments/AllComments/CommentsView"
import { useDispatch, useSelector } from "react-redux";
import { memo, useContext, useEffect } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import { getSingleUserThunk } from "../../../redux/users";
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import EditSongModal from "../Edit Song/EditSongModal";
import DeleteSongModal from "../DeleteSong/DeleteSongModal";

const SingleSongComponent = (song) => {
    const dispatch = useDispatch();
    const { currentSong, setCurrentSong } = useContext(PlayerContext);
    song = song.song;
    console.log(song);
    const user = useSelector(state => state.users.byId[song.user_id])

    useEffect(() => {
        dispatch(getSingleUserThunk(song.user_id));
    }, [dispatch]);

    return (
        <div className="songContainer">
            <h2>Title: {song.title}</h2>
            <div>Description: {song.description}</div>
            <div>Genre: {song.genre}</div>
            <div>Artist: {user.username}</div>
            {/* <CommentsView song={song} /> */}
            {/* <button
                onClick={async () => {
                    await dispatch(addQueueThunk(song))
                }}>Play</button> */}
            <button onClick={() => setCurrentSong(song)}>Play</button>
            <OpenModalButton
                modalComponent={<EditSongModal song={song} />}
                buttonText="Edit Song"
            />
            <OpenModalButton
                modalComponent={<DeleteSongModal songId={song.id} />}
                buttonText="Delete Song"
            />
        </div>
    )
}


export default memo(SingleSongComponent);
