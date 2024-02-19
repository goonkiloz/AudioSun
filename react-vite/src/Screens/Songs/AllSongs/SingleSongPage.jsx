import "./SongsView.css"
import CommentsView from "../../Comments/AllComments/CommentsView"
import { getSingleSongThunk } from "../../../redux/songs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AllLikesView from "../../Likes/AllLikes/AllLikesView";
import LikeOrRemoveLike from "../../Likes/AllLikes/LikeOrRemoveLike";

const SingleSongPage = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const currentSong = useSelector(state => state.songs.byId[songId])
    // console.log(currentSong)

    useEffect(() => {
        dispatch(getSingleSongThunk(songId));
    }, [dispatch, songId]);

    if (!currentSong) return <h2>Loading...</h2>

    return (
        <div className="songContainer">
            <img src={currentSong.song_image}/>
            <h2>Title: {currentSong.title}</h2>
            <LikeOrRemoveLike song={currentSong} />
            <div>Description: {currentSong.description}</div>
            <div>Genre: {currentSong.genre}</div>
            <div>Artist: {currentSong.artist.username}</div>
            <CommentsView song={currentSong} />

            <AllLikesView song={currentSong} />
        </div>
    )
}

export default SingleSongPage;
