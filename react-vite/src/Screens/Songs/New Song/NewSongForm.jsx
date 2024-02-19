import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUserSongsThunk, postSongThunk } from "../../../redux/songs";
import "./NewSong.css";

function NewSongForm() {
    // const history = useHistory()
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

    if (!user) return <Navigate to="/login" replace={true} />;

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
        // "song_file": filePath,
        // "title": title,
        // "genre": genre,
        // "description": description,
        // "userId": user.id
        setSongLoading(true);

        // const newSong = {
        //     title,
        //     userId: user.id,
        //     genre,
        //     description,
        //     filePath,
        // };

    //     await dispatch(postSongThunk(formData))
    //     .catch(async (res) => {
    //         setSongLoading(false);
    //         const errors = await res.json()
    //         setValidationErrors(errors)
    //     })
    //     .then((data) => {
    //         navigate(`/songs/${data.id}`)
    //     })

        if(!validationErrors.length) {
            const res = await dispatch(postSongThunk(formData))
            console.log(res)
            if (!res.res.ok){
                const errors = await res.res.json()
                // console.log(errors)
                setValidationErrors(errors)
                setButtonDisabled(false)
            } else {
                navigate(`/songs/${res.newSong.id}`)
            }
        }
    }

    return (
        <div className="pageContainer">
            <div className="header">
                <h1>Add a new song</h1>
            </div>
            <div>
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
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {validationErrors.description && hasSubmitted &&
                        <p className="error">{validationErrors.description}</p>}
                    <label>Upload File (jpg)
                        <input
                            type="file"
                            // accept="mp3/*"
                            onChange={(e) => setSongImg(e.target.files[0])}
                        />
                    </label>
                    {validationErrors.song_image && hasSubmitted &&
                        <p className="error">{validationErrors.song_image}</p>}
                    <label>Upload File (MP3)
                        <input
                            type="file"
                            // accept="mp3/*"
                            onChange={(e) => setFilePath(e.target.files[0])}
                        />
                    </label>
                    {validationErrors.filePath && hasSubmitted &&
                        <p className="error">{validationErrors.filePath}</p>}
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
