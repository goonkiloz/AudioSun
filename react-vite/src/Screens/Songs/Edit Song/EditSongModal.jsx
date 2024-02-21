import { useState } from "react";
// import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { getSongsThunk, putSongThunk } from "../../../redux/songs";
// import "./LoginForm.css";

function EditSongModal(song) {
    song = song.song;
    const songId = song.id;
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title);
    const [genre, setGenre] = useState(song.genre);
    const [description, setDescription] = useState(song.description);
    const [privacy, setPrivacy] = useState(song.privacy);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();
    const userId = song.userId;
    const filePath = song.file_path;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const updatedSong = {
            title,
            userId,
            genre,
            description,
            filePath,
            privacy,
        };

        const res = await dispatch(putSongThunk(updatedSong, songId))
        console.log("RES?????", res);

        if (!res.id) {
            console.log("res not ok???");
            setValidationErrors(res);
            console.log("errors?", validationErrors);
        } else {
            closeModal()
        }
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
        <div className='edit-song modalContainer'>
            <h1>Edit {song.title}</h1>
            <form onSubmit={handleSubmit}>
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
                {validationErrors.genre && hasSubmitted &&
                    <p className="error">{validationErrors.genre}</p>}
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
                {/* <label>Privacy
                    <input
                        type="checkbox"
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                    />
                </label> */}
                {/* {validationErrors.privacy && hasSubmitted &&
                    <p className="error">{validationErrors.privacy}</p>} */}
                <button>Submit</button>
                <button className='cancel-submit-button'
                    onClick={handleCancelSubmit}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditSongModal;
