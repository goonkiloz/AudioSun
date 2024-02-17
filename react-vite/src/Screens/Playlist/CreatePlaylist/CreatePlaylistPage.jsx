import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { postPlaylistThunk } from "../../../redux/playlists";

function NewPlaylistForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [ title, setTitle ] = useState(" ");
    const [ description, setDescription ] = useState(" ");
    const [ playlistImage, setPlaylistImage ] = useState("");

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    if (!user) return <Navigate to="/login" replace={true} />

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        setValidationErrors('');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description)
        formData.append("playlist_image", playlistImage)
        formData.append('userId', user.id)

        if (!validationErrors.length) {
            await dispatch(postPlaylistThunk(formData))
            .catch( async (res) => {
                if(res.ok) {
                    const errors = await res.json()
                    setValidationErrors(errors)
                }
            })
        }
        navigate(`/playlists/current`)

    }

    return (
        <div className="playlistPageContainer">
            <div className="header">
                <h1>Add a new playlist</h1>
            </div>
            <div>
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
                    <label> Upload Image(jpg)
                        <input
                            type="text"
                            value={playlistImage}
                            onChange={(e) => setPlaylistImage(e.target.value)}
                        />
                        </label>
                        {validationErrors.playlistImage && hasSubmitted &&
                        <p className="error">{validationErrors.playlistImage}</p>}

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewPlaylistForm
