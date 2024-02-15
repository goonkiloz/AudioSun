const GET_ALL_LIKES_BY_SONG = "likes/GET_ALL_LIKES_BY_SONG";
const POST_LIKE = "likes/POST_LIKE";
const REMOVE_LIKE = "likes/REMOVE_LIKE";

const loadLike = (likes) => {
  return {
    type: GET_ALL_LIKES_BY_SONG,
    payload: likes,
  };
};

const addLike = (like) => {
  return {
    type: POST_LIKE,
    payload: like,
  };
};

const removeLike = (likeId) => {
  return {
    type: REMOVE_LIKE,
    payload: likeId,
  };
};

//thunk action to fetch all likes
export const getLikesThunk = (songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/songs/${songId}/likes`);

    if (res.ok) {
      const data = await res.json();
      dispatch(loadLike(data.likes));
      return data;
    }
    throw res;
  } catch (e) {
    return e;
  }
};

//thunk action to add like to a song
export const postLikeThunk = (songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/songs/${songId}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addLike(data));
      dispatch(getLikesThunk(songId));
      return data;
    }
    throw res;
  } catch (e) {
    console.log(`e`, e);
    return e;
  }
};

//thunk action to remove like to a song
export const removeLikeThunk = (likeId, songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/likes/${likeId}`, {
      method: "DELETE",
    });
    console.log(res)
    if (res.ok) {
      const data = await res.json();
      dispatch(removeLike(likeId));
      dispatch(getLikesThunk(songId));
      return data;
    }
    throw res;
  } catch (e) {
    return e;
  }
};

const initialState = { allLikes: [], byId: {} };

//create likes reducers to process actions
const likesReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_LIKES_BY_SONG:
      newState.allLikes = action.payload;
      action.payload.forEach((like) => {
        newState.byId[like.id] = like;
      });
      return newState;

    case POST_LIKE:
      newState.allLikes.push(action.payload);
      newState.byId[action.payload.id] = action.payload;
      return newState;

    case removeLike:
      newState.allLikes = newState.allLikes.filter(
        (like) => like.id !== action.payload.likeId
      );
      delete newState.byId[action.payload];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
