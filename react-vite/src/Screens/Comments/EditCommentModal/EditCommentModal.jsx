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

        const comment = {
            commentText: newComment
        }


        try {
            const res = await dispatch(editCommentThunk(comment, commentId, songId));
            if (res.status === 200) {
                closeModal();
            } else {
                const errors = await res.json();
                setValidationErrors(errors);
            }
        } catch (error) {
            console.error("Error occurred while editing comment:", error);
        }
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='edit-comment-container'>
            <h1 className='title'>Update Your Comment</h1>

            {validationErrors && (
                <p className=''>{validationErrors.comment_text}</p>
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
                    disabled={comment.length < 10}
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
