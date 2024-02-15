import './AllLikes.css';
import { getLikesThunk } from "../../../redux/likes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LikeOrDisLike = (song) => {

    const dispatch = useDispatch();

    const currentSong = song.song
    const likes = useSelector(state => state.likes?.allLikes)
    console.log(`likes`, likes)

    useEffect(() => {
        dispatch(getLikesThunk(currentSong.id))
    },[dispatch, currentSong])

    if (!likes) return <div>Loading...</div>

    if (likes.length === 0) {
        return <div>No Likes for this song yet!</div>
    }

    return (
        <div>
            <h2>Likes for the song</h2>
            <div className='likesContainer'>
                {likes.map(like => (
                    <div key={like.id} className='likeBox'>
                        <div>UserID: {like.user_id}</div>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default LikeOrDisLike;
