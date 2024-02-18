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
                console.log(res)
                const errors = await res.json()
                console.log(errors)
                setValidationErrors(errors)
            } else {
                navigate(`/playlists/current`)
            }
        }




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
                    <label> Upload Image(url)
                        <input
                            type="text"
                            value={playlistImage}
                            onChange={(e) => setPlaylistImage(e.target.value)}
                        />
                        </label>
                        {validationErrors.playlist_image && hasSubmitted &&
                        <p className="error">{validationErrors.playlist_image}</p>}

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewPlaylistForm
