import './AllLikes.css';
import { getLikesThunk } from "../../../redux/likes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllLikesView = (song) => {

    const dispatch = useDispatch();

    const currentSong = song.song
    const likes = useSelector(state => state.likes?.allLikes)
    console.log(`likes`, likes)

    useEffect(() => {
        dispatch(getLikesThunk(currentSong.id))
    },[dispatch, currentSong])

    if (!likes) return <div>Loading...</div>

    if (likes.length === 0) {
        return <h2>No like for this song yet!</h2>
    }

    return (
        <div>
            {/* <h2>{likes.length} {likes.length === 1 ? 'like' : 'likes'} </h2> */}
            <div className='users-likes-container'>
                <h2>Users who likes the song:</h2>

                {likes.map(like => (
                    <div key={like.id} className='like-Box'>

                        <div>UserID: {like.user_id}</div>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default AllLikesView;
