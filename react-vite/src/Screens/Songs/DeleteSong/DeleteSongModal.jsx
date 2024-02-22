import { memo, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { deleteSongThunk } from '../../../redux/songs';
import { PlayerContext } from "../../../context/PlayerContext";

function DeleteSong({ songId }) {
    const dispatch = useDispatch();
    const { currentSong, setCurrentSong, setIsPlaying, isPlaying, setTimeProgress } = useContext(PlayerContext);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentSong?.id === songId) {
            console.log("called");
            setCurrentSong('');
            setTimeProgress(0);
            setIsPlaying(false);
        }
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
                Yes
            </button>
            <button
                className='delete-song cancel-button'
                // type='button'
                onClick={handleCancel}
            >
                No
            </button>
        </div>
    )
}

export default memo(DeleteSong);
