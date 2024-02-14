import "./SongsView.css"
// import CommentsView from "../../Comments/AllComments/CommentsView"
// import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import EditSongModal from "../Edit Song/EditSongModal";

const SingleSongComponent = (song) => {
    console.log("SONG????", song);
    song = song.song;
    return (
        <div className="songContainer">
            <h2>Title: {song.title}</h2>
            <div>Description: {song.description}</div>
            <div>Genre: {song.genre}</div>
            <div>Artist: {song.user_id}</div>
            {/* <CommentsView song={song} /> */}
            <OpenModalButton
                modalComponent={<EditSongModal song={song} />}
                buttonText="Edit Song"
            />
        </div>
    )
}

export default memo(SingleSongComponent);