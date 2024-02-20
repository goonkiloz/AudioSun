import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useModal } from '../../../context/Modal';
import { getCurrentUserPlaylistsThunk, putPlaylistThunk } from "../../../redux/playlists";

function EditPlaylist({playlistId}){
    const dispatch = useDispatch()

    const playlist = useSelector((state) => state.playlists.byId[playlistId])
    const user = useSelector((state) => state.session.user);

    const [ title, setTitle ] = useState(playlist?.title);
    const [ description, setDescription ] = useState(playlist?.description);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();
    //console.log(spotId)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        setValidationErrors('');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description)
        formData.append('userId', user.id)

        if(!validationErrors.length) {
            const res = await dispatch(putPlaylistThunk(formData, playlistId))
            if (!res.ok){
                console.log(res)
                const errors = await res.json()
                console.log(errors)
                setValidationErrors(errors)
            }else {
                dispatch(getCurrentUserPlaylistsThunk())
                return closeModal()
            }
        }

    }
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };
    return (
        <div className='edit-playlist modalContainer'>
            <h1>Edit Playlist</h1>
            <form
                    onSubmit={handleSubmit}
                    className="playlistFormContainer"
                >
                    <label>Title
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    {validationErrors.title && hasSubmitted &&
                        <p className="error">{validationErrors.title}</p>}
                    <label>Description
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {validationErrors.description && hasSubmitted &&
                        <p className="error">{validationErrors.description}</p>}
                    <button>Submit</button>
                </form>

                <button
                className='edit-playlist cancel-button'
                type='button'
                label='Cancel'
                onClick={handleCancelSubmit}
                >Cancel</button>

        </div>
    )
}

export default EditPlaylist
