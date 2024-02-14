import "./SongsView.css"
import CommentsView from "../../Comments/AllComments/CommentsView"
import { getSingleSongThunk } from "../../../redux/songs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";

const SingleSongView = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const currentSong = useSelector(state => state.songs.byId[songId])
    // console.log(currentSong)

    useEffect(() => {
        dispatch(getSingleSongThunk(songId));
    }, [dispatch]);

    if (!currentSong) return <h2>Loading...</h2>

    return (
        <div className="songContainer">
            <h2>Title: {currentSong.title}</h2>
            <div>Description: {currentSong.description}</div>
            <div>Genre: {currentSong.genre}</div>
            <div>Artist: {currentSong.user_id}</div>
            <CommentsView song={currentSong} />
        </div>
    )
}

export default memo(SingleSongView);
