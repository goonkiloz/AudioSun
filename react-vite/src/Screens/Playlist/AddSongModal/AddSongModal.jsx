import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useNavigate } from "react-router-dom";
import { getCurrentUserPlaylistsThunk } from '../../../redux/playlists';
import '../../../index.css'


function AddSong({songId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [ playlists, setPlaylists ] = useState([])
    const { closeModal } = useModal()
    const currentUserPlaylists = useSelector((state) => state.playlists?.currentUserPlaylists)

    useEffect(() => {
        dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch])

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();

        playlists?.forEach(async (playlistId) => {
            await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
                method: "POST"
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

    let playlistCheck = []


    currentUserPlaylists?.map((playlist) => {
        let songIds = []

        playlist?.songs?.map(song => {
            songIds?.push(song.id)
        })

        if (!songIds?.includes(songId)) {
            playlistCheck?.push(playlist)
        }

    })

    if(currentUserPlaylists?.length === 0){
        return (
            <div className='add-song modalContainer'>
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
    } else if(playlistCheck?.length === 0) {
        return (
            <div className='add-song modalContainer'>
                <h1>Add Song</h1>
                <p>Song is added to all playlists</p>
                <button
                className='add-song cancel-button'
                type='button'
                label='Cancel'
                onClick={handleCancelSubmit}
                >Cancel</button>
            </div>
        )
    } else {
        return (
            <div className='add-song modalContainer'>
                <h1>Add Song</h1>
                <p>Which Playlist would you like to add this to?</p>
                <div>
                    {playlistCheck?.map((playlist)=> {
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

}

export default AddSong;
