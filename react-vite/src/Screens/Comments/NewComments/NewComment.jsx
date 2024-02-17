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

        if (!validationErrors.length) {
            const res = await dispatch(postCommentThunk(newComment, songId))
            console.log(`what is the res`, res)
            console.log(`what is validation errors`, validationErrors)
            setComment('')
            if (!res.ok) {
                const errors = await res.json()
                console.log(`is this called for errors`, errors)
                setValidationErrors(errors)
                console.log(`validation Error`, validationErrors)
            }
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
                    <p>{validationErrors.comment_text}</p>
                )}
                <button className='postreview-submit-button'
                    type='button'
                    onClick={handleSubmit}
                    disabled={comment.length < 10}
                >
                    Submit Your comment
                </button>
            </form>
        </div>
    )
}


export default NewComment
