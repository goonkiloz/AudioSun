import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { getPlaylistSongsThunk } from "../../../redux/playlists";

function RemoveSong({songId, playlistId}){
    const dispatch = useDispatch()

    const [ errors, setErrors ] = useState({})
    const { closeModal } = useModal();

    const handleConfirmSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
            method: "DELETE"
        })
        .catch((res) => {
            if (res && res.message) {
                setErrors(res)
            }
        })

        closeModal()
        return dispatch(getPlaylistSongsThunk(playlistId))


    }

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
        <div className="remove-song modal-container">
            <h1>Confirm Remove</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>

                )}
            <p>Are you sure you want to remove this song?</p>
            <div>
                <button
                    className="remove-song confirm-button"
                    type='button'
                    onClick={handleConfirmSubmit}
                >
                    Yes (Remove)
                </button>
                <button
                    className="remove-song cancel-button"
                    type="button"
                    onClick={handleCancelSubmit}
                >
                    No (Cancel)
                </button>
            </div>
        </div>
    )
}

export default RemoveSong;
