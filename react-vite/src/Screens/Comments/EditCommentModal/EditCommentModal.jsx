import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './EditCommentModal.css'
import { editCommentThunk } from '../../../redux/comments';

function EditComment({ comment, songId }) {
    //console.log(spotId)
    const dispatch = useDispatch();
    const commentText = comment.comment_text
    const commentId = comment.id
    //const sessionUser = useSelector((state) => state.session.user);
    const [validationErrors, setValidationErrors] = useState({});
    const [newComment, setNewComment] = useState(commentText);
    const { closeModal } = useModal();
    //console.log(spotId)

    useEffect(() => {
        setValidationErrors({});
    }, [newComment]);


    const handleConfirmSubmit = async (e) => {
        e.preventDefault();

        const comment = {
            commentText: newComment
        }


        const res = await dispatch(editCommentThunk(comment, commentId, songId));

        console.log(res)

        if (!res.id) {
            setValidationErrors(res);
        } else {
            console.log(`is this called?`)
            closeModal()
        }

    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='edit-comment modalContainer'>
            <h1 className='title'>Update Your Comment</h1>

            {validationErrors && (
                <p className='comment form-error'>{validationErrors.comment_text}</p>
            )}

            <form className='comment-form' onSubmit={handleConfirmSubmit}>
                <textarea className='post-comment-form-input'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    name='comment'
                    placeholder='Leave your comment here...'
                    rows='5'
                >
                </textarea>
                <button className='confirm-submit-button'
                    type='button'
                    onClick={handleConfirmSubmit}
                    disabled={newComment.length < 10}
                >
                    Yes
                </button>
                <button className='cancel-submit-button'
                    type='button'
                    onClick={handleCancelSubmit}
                >
                    No
                </button>
            </form>
        </div>
    )
}

export default EditComment
