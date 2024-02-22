import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { postPlaylistThunk } from "../../../redux/playlists";
import './CreatePlaylist.css'
function NewPlaylistForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [ title, setTitle ] = useState(" ");
    const [ description, setDescription ] = useState(" ");
    const [ playlistImage, setPlaylistImage ] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    if (!user) return <Navigate to="/login" replace={true} />

    const handleCancelSubmit = () => {
        navigate(`/playlists/current`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setButtonDisabled(true)
        setValidationErrors("")
        setHasSubmitted(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description)
        formData.append("playlist_image", playlistImage)
        formData.append('userId', user.id)

        if(!validationErrors.length) {
            const res = await dispatch(postPlaylistThunk(formData))
            if (!res.ok){
                const errors = await res.json()
                setValidationErrors(errors)
                setButtonDisabled(false)
            } else {
                navigate(`/playlists/current`)
            }
        }

    }

    return (
        <div className="pageContainer">
            <div>
                <div className="header">
                    <h1>Add a new playlist</h1>
                </div>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="formContainer"
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
                        <label> Upload Playlist Cover ( jpg, jpeg, png )
                        <input
                                type="file"
                                // accept="mp3/*"
                                onChange={(e) => setPlaylistImage(e.target.files[0])}
                            />
                        </label>
                        {validationErrors.playlist_image && hasSubmitted &&
                        <p className="error">{validationErrors.playlist_image}</p>}

                        <button
                            className="remove-playlist-confirm-button"
                            disabled={isButtonDisabled}
                        >Submit</button>

                        <button
                            type="button"
                            onClick={handleCancelSubmit}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewPlaylistForm
