import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from '../../../context/Modal';
import './EditCommentModal.css'
import { editCommentThunk } from '../../../redux/comments';

function EditComment ({comment, songId}) {
    //console.log(spotId)
    const dispatch = useDispatch();
    const commentText = comment.comment_text
    const commentId= comment.id
    //const sessionUser = useSelector((state) => state.session.user);
    const [validationErrors, setValidationErrors] = useState({});
    const [newComment, setNewComment] = useState(commentText);
    const { closeModal } = useModal();
    //console.log(spotId)
    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        const comment = {
            commentText: newComment
        }

        if(!validationErrors.length) {
            const res = await dispatch(editCommentThunk(comment, commentId, songId))
            if(!res.ok) {
                const errors = await res.json()
                setValidationErrors(errors)
            }
        }

    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='edit-comment-container'>
            <h1 className='title'>Update Your Comment</h1>

            {validationErrors.message && (
                <p className=''>{validationErrors.message}</p>
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
                    // disabled={review.length < 10}
                >
                    Yes
                </button>
                <button className='cancel-submit-button'
                    type='button'
                    onClick={handleCancelSubmit}
                    // disabled={review.length < 10}
                >
                    No
                </button>
            </form>
        </div>
    )
}

export default EditComment
