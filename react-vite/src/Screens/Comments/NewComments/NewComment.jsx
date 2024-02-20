import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { postCommentThunk } from '../../../redux/comments';
import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

//should a SingleSongView Page, which pass on the songId
const NewComment = (song) => {
    const currentSong = song.song
    const currentUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const { songId } = useParams();
    const [validationErrors, setValidationErrors] = useState({});
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        setValidationErrors({});
    }, [comment]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            commentText: comment,
            userId: currentUser.Id,
            songId: currentSong.id
        }

        const res = await dispatch(postCommentThunk(newComment, songId))

        console.log(`what is the res`, res)

        if (!res.id) {

            setValidationErrors(res)
            console.log(`validation Error`, validationErrors)
        } else {
            setComment('')
        }

    };

    return (
        <div>

            <form className='comment-form' onSubmit={handleSubmit}>
                <textarea className='post-comment-form-input'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    name='comment'
                    placeholder='Write a comment'
                    rows='5'
                >
                </textarea>
                {validationErrors && (
                <p className='comment form-error'>{validationErrors.comment_text}</p>
                )}
                <div>
                    <button className='postreview-submit-button'
                        type='button'
                        onClick={handleSubmit}
                        disabled={comment.length < 10}
                    >
                        Submit Your comment
                    </button>
                </div>

            </form>
        </div>
    )
}


export default NewComment
