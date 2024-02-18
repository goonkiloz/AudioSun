import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useNavigate } from "react-router-dom";




function AddSong({songId}) {
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({})
    const [ playlists, setPlaylists ] = useState([])
    const { closeModal } = useModal()
    const currentUserPlaylists = useSelector((state) => state.playlists?.currentUserPlaylists)

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        playlists?.forEach(async (playlistId) => {
            await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
                method: "POST"
            })
            .catch((res) =>{
                if (res && res.message) {
                    setErrors(res);
                }
            })
        })

        closeModal()
        return setPlaylists([])
    }

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        setPlaylists([])
        closeModal()
    };

    if(currentUserPlaylists.length === 0){
        return (
            <div className='add-song modal-container'>
                <h1>Add Song</h1>
                <p>Would you like to create a playlist?</p>
                <button
                className='add-song confirm-button'
                type='button'
                onClick={() => {
                    navigate('/playlists/new')
                    closeModal()
                }}
                >Yes</button>
                <button
                className='add-song cancel-button'
                type='button'
                label='Cancel'
                onClick={handleCancelSubmit}
                >Cancel</button>
            </div>
        )
    }

    return (
        <div className='add-song modal-container'>
            <h1>Add Song</h1>
            <p>Which Playlist would you like to add this to?</p>
            <div>
                {currentUserPlaylists?.map((playlist)=> {
                   return(
                        <label key={playlist.id}>{playlist.title}
                            <input
                                type="checkbox"
                                value={playlist.id}
                                onChange={(e) => {
                                    if(!playlists.includes(e.target.value)){
                                        setPlaylists((playlists) => [e.target.value, ...playlists])
                                    } else {
                                        let newPlaylists = playlists.filter((playlistId) => playlistId !== e.target.value)
                                        console.log(newPlaylists)
                                        setPlaylists(newPlaylists)
                                    }
                                }}
                            />
                        </label>
                    )
                })}
            </div>

            <button
                className='add-song confirm-button'
                type='button'
                onClick={handleConfirmSubmit}
            >Add</button>
            <button
                className='add-song cancel-button'
                type='button'
                label='Cancel'
                onClick={handleCancelSubmit}
            >Cancel</button>

        </div>
    )
}

export default AddSong;
