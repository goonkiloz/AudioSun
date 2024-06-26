import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { putSongThunk } from "../../../redux/songs";

function EditSongModal(song) {
    song = song.song;
    const songId = song.id;
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title);
    const [genre, setGenre] = useState(song.genre);
    const [description, setDescription] = useState(song.description);
    const [privacy] = useState(song.privacy);
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

        if (!res.id) {
            setValidationErrors(res);
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
            <h1 className='edit-comment-h1'>Edit {song.title}</h1>
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
