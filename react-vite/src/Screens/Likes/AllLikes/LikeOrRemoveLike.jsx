import './AllLikes.css';
import { postLikeThunk, removeLikeThunk } from "../../../redux/likes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LikeOrRemoveLike = (song) => {

    const dispatch = useDispatch();
    const [like, setLike] = useState(false)
    const [likeId, setLikeId] = useState(null)
    const currentSongId = song.song.id;
    console.log(`songId`, currentSongId)
    const likes = useSelector(state => state.likes?.allLikes);
    console.log(`likes`, likes[0])
    const currentUserId = useSelector(state => state.session?.user?.id);
    console.log(`currentUserId`,currentUserId)

    useEffect(() => {
        if(likes && currentUserId){
            const currentUserLike = likes.find(like => like.user_id === currentUserId)
            console.log(`currentUserLike`,currentUserLike)
            if (currentUserLike) {
                setLike(true);
                setLikeId(currentUserLike.id)
            } else {
                setLike(false);
                setLikeId(null)
            }
        }

    },[currentUserId, likes, currentSongId])

    const handleLike = () => {
        if(!like) {
            dispatch(postLikeThunk(currentSongId))
        } else {
            dispatch(removeLikeThunk(likeId, currentSongId))
        }
    }

    if (!currentUserId) {
        return <div>Please log in to like the song.</div>;
    }

    return (
        <div>
            <div className='likes-container'>
                <div className={like ? `filled` : `empty`}
                    onClick={handleLike}
                >
                    <i className="fa-solid fa-heart"></i>

                </div>
                <div className='like-count'>{likes.length} </div>
            </div>
        </div>
    )
}

export default LikeOrRemoveLike;
