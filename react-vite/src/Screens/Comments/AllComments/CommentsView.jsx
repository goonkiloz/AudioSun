import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../../redux/comments';
import { useEffect } from "react";
import './CommentsView.css';
import OpenModalButton from '../../Global/OpenModalButton/OpenModalButton';
import RemoveComment from "../RemoveCommentModal/RemoveCommentModal";
import EditComment from "../EditCommentModal/EditCommentModal";
import NewComment from "../NewComments/NewComment";
// import { NavLink } from "react-router-dom";

//should a SingleSongView Page, which pass on the songId
const CommentsView = (song) => {
    const currentSong = song.song
    const currentUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments?.allComments)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommentsThunk(currentSong.id))
    },[dispatch, currentSong])

    if (!comments) return <div>Loading...</div>

    if (comments.length === 0) {
        return(
            <div>
                {(currentUser) && <NewComment song={song} />}
                <div>Be the first to post a comment!</div>
            </div>


        )

    }

    return (
        <div>

            {(currentUser) && <NewComment song={song} />}
            <h3>{comments.length> 1 ? comments.length + ' Comments' : '1 Comment'} </h3>
            <div className='commentsContainer'>
                {comments.map(comment => (
                    <div key={comment.id} className='commentBox'>
                        <div>{comment.comment_text}</div>

                        {currentUser && (currentUser.id === comment.user_id) && (
                        <div className="comment-button-container">
                            <div className="comment-delete-button">
                                <OpenModalButton
                                modalComponent={<RemoveComment commentId={comment.id}/>}
                                buttonText='Delete'
                                />
                            </div>
                            <div className="comment-edit-button">
                                <OpenModalButton
                                modalComponent={<EditComment comment={comment} songId={currentSong.id} />}
                                buttonText='Edit'
                                />
                            </div>

                        </div>)}
                    </div>
                ))}

            </div>

        </div>
    )
}


export default CommentsView
