import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { getCurrentUserPlaylistsThunk, removePlaylistThunk } from '../../../redux/playlists';

function DeletePlaylist({ playlistId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        return dispatch(removePlaylistThunk(playlistId))
            .then(async () => await dispatch(getCurrentUserPlaylistsThunk()))
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
        <div className='modal-container'>
            <h1>Confirm Delete Playlist</h1>
            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>Are you sure you want to remove this playlist?</p>

            <button
                className='delete-playlist confirm-button'
                // type='button'
                onClick={handleSubmit}
            >
                Yes (Delete playlist)
            </button>
            <button
                className='delete-playlist cancel-button'
                // type='button'
                onClick={handleCancel}
            >
                No (Keep playlist)
            </button>
        </div>
    )
}

export default DeletePlaylist;
