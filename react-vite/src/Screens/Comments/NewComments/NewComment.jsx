import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../../redux/comments';
import { useEffect } from "react";
import './CommentsView.css';
// import { NavLink } from "react-router-dom";

//should a SingleSongView Page, which pass on the songId
const CommentsView = (song) => {
    const currentSong = song.song
    console.log(`what is the current song`, currentSong)
    const comments = useSelector(state => state.comments?.allComments)

    if(comments) {
        console.log(`what is the current comment`, comments)
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommentsThunk(currentSong.id))
    },[dispatch, currentSong])

    if (!comments) return <div>Loading...</div>

    if (comments.length === 0) {
        return <div>Be the first to post a comment!</div>
    }

    return (
        <div>

        </div>
    )
}


export default CommentsView
