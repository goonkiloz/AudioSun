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
        console.log(res);

        if (!res.id) {
            setValidationErrors(res);
            setSongLoading(false);
            setButtonDisabled(false)
        } else {
            console.log("??? run ???");
            navigate(`/songs/${res.id}`)
        }
    }

    return (
        <div className="pageContainer">
            <div>
                <h1>Add a new song</h1>
                <form
                    onSubmit={handleSubmit}
                    className="formContainer"
                // encType="multipart/form-data"
                >
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

                    <label>Genre
                        <input
                            type="text"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
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
                        disabled={isButtonDisabled}
                    >Submit</button>
                    {(songLoading) && <p>Loading...</p>}
                </form>
            </div>
        </div>
    );
}

export default memo(NewSongForm);
