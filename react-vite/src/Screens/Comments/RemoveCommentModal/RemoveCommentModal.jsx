import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './RemoveCommentModal.css'
import { deleteCommentThunk } from '../../../redux/comments';

function RemoveComment ({commentId}) {
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(deleteCommentThunk(commentId))
          .then(closeModal)
          .catch(async (res) => {
            //const data = await res.json();
            if (res && res.message) {
                setErrors(res);
            }
        });
    };
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='delete-comment modalContainer'>
            <h1 className='delte-comment-h1'>Confirm Delete</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this comment?
            </p>

            <button
                className='delete-comment comfirm-button'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Comment)
            </button>

            <button
                className='delete-comment cancel-button'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Comment)
            </button>

        </div>
    )
}

export default RemoveComment
