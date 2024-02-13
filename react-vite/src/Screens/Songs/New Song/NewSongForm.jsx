import { memo, useState } from "react";
// import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { postSongThunk } from "../../../redux/songs";
import "./NewSong.css";

function NewSongForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [filePath, setFilePath] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newSong = {
            title,
            userId: user.id,
            genre,
            description,
            filePath,
            privacy,
        };

        let song

        if (!validationErrors.length) {
            song = await dispatch(postSongThunk(newSong))
                .catch(async (res) => {
                    const err = await res.json();
                    // console.log("songform", err);

                    if (err) {
                        setValidationErrors(err);
                    }
                });
        }
        // navigate(`/${song.id}`)
    };

    return (
        <div className="pageContainer">
            <div className="header">
                <h1>Add a new song</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="formContainer">
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
                    <label>Genre
                        <input
                            type="text"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </label>
                    {validationErrors.description && hasSubmitted &&
                        <p className="error">{validationErrors.description}</p>}
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
                    <label>File Path
                        <input
                            type="text"
                            placeholder="File Path"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                        />
                    </label>
                    {validationErrors.filePath && hasSubmitted &&
                        <p className="error">{validationErrors.filePath}</p>}
                    <label>Privacy
                        <input
                            type="text"
                            placeholder="Privacy"
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                        />
                    </label>
                    {validationErrors.privacy && hasSubmitted &&
                        <p className="error">{validationErrors.privacy}</p>}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default memo(NewSongForm);
