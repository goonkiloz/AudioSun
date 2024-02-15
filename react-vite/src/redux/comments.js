//action types
const GET_ALL_COMMENTS_BY_SONG_ID = "comments/GET_ALL_COMMENTS_BY_SONG_ID";
const POST_COMMENT = "comments/POST_COMMENT";
const EDIT_COMMENT = "comments/EDIT_Comment";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

//action creators to handle action
const loadComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS_BY_SONG_ID,
    payload: comments,
  };
};

const addComment = (comment) => {
  return {
    type: POST_COMMENT,
    payload: comment,
  };
};

const editComment = (songId, comment) => {
  return {
    type: EDIT_COMMENT,
    payload: { songId, comment },
  };
};

const removeComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    payload: commentId,
  };
};

//thunk action to fetch all comments
export const getCommentsThunk = (songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/songs/${songId}/comments`);
    console.log(`res`, res);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadComments(data.comments));
      return data;
    }
    throw res;
  } catch (e) {
    return e;
  }
};
//thunk action to add comment to a song
export const postCommentThunk = (comment, songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/songs/${songId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_text: comment.commentText,
        user_id: comment.userId,
        song_id: comment.songId,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addComment(data));
      dispatch(getCommentsThunk(songId));
      return data;
    }
    throw res;
  } catch (e) {
    console.log(`e`, e);
    return e;
  }
};

//thunk action to edit comment on a song
export const editCommentThunk =
  (comment, commentId, songId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_text: comment.commentText,
        }),
      });
      if (res.ok) {
        console.log(res);
        const data = await res.json();
        dispatch(editComment(data));
        dispatch(getCommentsThunk(songId));
        return data;
      }
      throw res;
    } catch (e) {
      return e;
    }
  };
//thunk action to delete comment to a song
export const deleteCommentThunk = (commentId, songId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(removeComment(commentId));
      console.log("is load comments called?");
      dispatch(getCommentsThunk(songId));
      return data;
    }
    throw res;
  } catch (e) {
    return e;
  }
};

//declare a normalized default state
const initialState = { allComments: [], byId: {} };

//create comment reducers to process actions
const commentsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_COMMENTS_BY_SONG_ID:
      newState.allComments = action.payload;
      action.payload.forEach((comment) => {
        newState.byId[comment.id] = comment;
      });
      return newState;

    case POST_COMMENT:
      newState.allComments.push(action.payload);
      newState.byId[action.payload.id] = action.payload;
      return newState;

    case EDIT_COMMENT: {
      const index = newState.allComments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      newState.allComments[index] = action.payload;
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }

    case REMOVE_COMMENT:
      newState.allComments = newState.allComments.filter(
        (comment) => comment.id !== action.payload.commentId
      );
      delete newState.byId[action.payload];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
