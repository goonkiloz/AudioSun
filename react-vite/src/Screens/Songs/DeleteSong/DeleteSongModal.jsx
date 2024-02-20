import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { deleteSongThunk } from '../../../redux/songs';

function DeleteSong({ songId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        return dispatch(deleteSongThunk(songId))
            .then(closeModal)
            .catch(async (res) => {
                if (res) {
                    setErrors(res);
                }
            });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
        <div className='delete-song modalContainer'>
            <h1>Confirm Delete Song</h1>
            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>Are you sure you want to remove this song?</p>

            <button
                className='delete-song confirm-button'
                // type='button'
                onClick={handleSubmit}
            >
                Yes (Delete Song)
            </button>
            <button
                className='delete-song cancel-button'
                // type='button'
                onClick={handleCancel}
            >
                No (Keep Song)
            </button>
        </div>
    )
}

export default memo(DeleteSong);
