import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSongThunk } from "../../../redux/songs";
import "./NewSong.css";

function NewSongForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [filePath, setFilePath] = useState("");
    const [songImg, setSongImg] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [songLoading, setSongLoading] = useState(false);

    if (!user) return <h2>You need to sign in to add a new song</h2>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        setHasSubmitted(true);
        setValidationErrors('');
        const formData = new FormData();
        formData.append("title", title);
        formData.append("genre", genre);
        formData.append('song_image', songImg)
        formData.append("description", description);
        formData.append("userId", user.id);
        formData.append("file_path", filePath);
        setSongLoading(true);

        const res = await dispatch(postSongThunk(formData));

        if (!res.id) {
            setValidationErrors(res);
            setSongLoading(false);
            setButtonDisabled(false)
        } else {
            navigate(`/songs/${res.id}`)
        }
    }

    const handleCancelSubmit = () => {
        navigate(`/profile`)
    }

    return (
        <div className="pageContainer">
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="formContainer"
                // encType="multipart/form-data"
                >
                    <h1>Add a new song</h1>
                    <label>Title
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {validationErrors.title && hasSubmitted &&
                            <p className="error">{validationErrors.title}</p>}
                    </label>

                    <label>Choose a Genre:
                        <select name="genres"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                            <option value="Hip Hop">Hip Hop</option>
                            <option value="R&B">R&B</option>
                            <option value="Country">Country</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Classical">Classical</option>
                            <option value="Reggae">Reggae</option>
                            <option value="Folk">Folk</option>
                            <option value="Blues">Blues</option>
                            <option value="Metal">Metal</option>
                            <option value="Indie">Indie</option>
                            <option value="Punk">Punk</option>
                            <option value="Alternative">Alternative</option>
                            <option value="Funk">Funk</option>
                            <option value="Soul">Soul</option>
                            <option value="Gospel">Gospel</option>
                            <option value="Disco">Disco</option>
                            <option value="Techno">Techno</option>
                        </select>
                        {validationErrors.genre && hasSubmitted &&
                            <p className="error">{validationErrors.genre}</p>}
                    </label>

                    <label>Description
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {validationErrors.description && hasSubmitted &&
                            <p className="error">{validationErrors.description}</p>}
                    </label>

                    <label>Upload File (jpg)
                        <input
                            type="file"
                            // accept="mp3/*"
                            onChange={(e) => setSongImg(e.target.files[0])}
                        />
                        {validationErrors.song_image && hasSubmitted &&
                            <p className="error">{validationErrors.song_image}</p>}
                    </label>

                    <label>Upload File (mp3)
                        <input
                            type="file"
                            // accept="mp3/*"
                            onChange={(e) => setFilePath(e.target.files[0])}
                        />
                        {validationErrors.file_path && hasSubmitted &&
                            <p className="error">{validationErrors.file_path}</p>}
                    </label>

                    {/* <label>Privacy
                        <input
                            type="checkbox"
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                        />
                    </label> */}
                    {/* {validationErrors.privacy && hasSubmitted &&
                        <p className="error">{validationErrors.privacy}</p>} */}
                    <button
                        type="submit"
                        className="new-song-form-submit"
                        disabled={isButtonDisabled}
                    >Submit</button>

                    <button
                        type="button"
                        onClick={handleCancelSubmit}
                    >
                        Cancel
                    </button>

                    {(songLoading) && <p>Loading...</p>}
                </form>
            </div>
        </div>
    );
}

export default memo(NewSongForm);
