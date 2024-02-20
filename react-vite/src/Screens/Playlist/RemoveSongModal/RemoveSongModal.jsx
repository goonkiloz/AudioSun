import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { getPlaylistThunk } from "../../../redux/playlists";
import { useParams } from "react-router-dom";

function RemoveSong({songId}){
    const dispatch = useDispatch()
    const { playlistId } = useParams()

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
        dispatch(getPlaylistThunk(playlistId))
        return closeModal()



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
