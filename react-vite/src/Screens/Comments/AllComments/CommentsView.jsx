import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../../redux/comments';
import { useEffect } from "react";
import './CommentsView.css';
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import RemoveComment from "../RemoveCommentModal/RemoveCommentModal";
// import { NavLink } from "react-router-dom";

//should a SingleSongView Page, which pass on the songId
const CommentsView = (song) => {
    const currentSong = song.song
    const currentUser = useSelector(state => state.session.user)
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
            <h2>Comments:</h2>
            {(currentUser) && (
                    <button>
                        Add a comment
                    </button>
            )}
            <div className='commentsContainer'>
                {comments.map(comment => (
                    <div key={comment.id} className='commentBox'>
                        <div>{comment.comment_text}</div>
                        <button>Edit the comment</button>
                        <OpenModalButton
                        modalComponent={<RemoveComment commentId={comment.id} songId={currentSong.id} />}
                        buttonText='Delete the Comment'
                    />

                    </div>
            ))}

            </div>

        </div>
    )
}


export default CommentsView
