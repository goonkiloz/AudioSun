import './AllLikes.css';
import { postLikeThunk, removeLikeThunk } from "../../../redux/likes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LikeOrRemoveLike = (song) => {

    const dispatch = useDispatch();
    const [like, setLike] = useState(false)
    const [likeId, setLikeId] = useState(null)
    const currentSongId = song.song.id;
    const likes = useSelector(state => state.likes?.allLikes);
    const currentUserId = useSelector(state => state.session?.user?.id);

    useEffect(() => {
        if(likes && currentUserId){
            const currentUserLike = likes.find(like => like.user_id === currentUserId)
            if (currentUserLike) {
                setLike(true);
                setLikeId(currentUserLike.id)
            } else {
                setLike(false);
                setLikeId(null)
            }
        }

        if(likes.length === 0) {
            setLike(false);
            setLikeId(null)
        }

    },[currentUserId, likes, currentSongId])

    const handleLike = () => {
        if(!like) {
            dispatch(postLikeThunk(currentSongId))
        } else {
            dispatch(removeLikeThunk(likeId))
        }
    }

    if (!currentUserId) {
        return <div>Please log in to like the song.</div>;
    }

    return (
        <div>
            <div className='likesContainer'>
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
