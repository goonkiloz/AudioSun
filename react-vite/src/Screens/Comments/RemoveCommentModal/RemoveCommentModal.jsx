import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './RemoveCommentModal.css'
import { deleteCommentThunk } from '../../../redux/comments';

function RemoveComment ({commentId, songId}) {
    //console.log(spotId)
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    //console.log(spotId)
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(deleteCommentThunk(commentId, songId))
          .then(closeModal)
          .catch(async (res) => {
            //const data = await res.json();
            //console.log(data)
            if (res && res.message) {
                setErrors(res);
            }
            //console.log(errors)
        });
    };
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='delete-comment modal-container'>
            <h1>Confirm Delete</h1>

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
