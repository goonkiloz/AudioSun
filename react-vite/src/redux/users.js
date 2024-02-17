
const GET_USERS = "users/getAll";
const GET_SINGLE_USER = "users/getSingleUser";

const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
};

const getSingleUser = (userId) => {
    return {
        type: GET_SINGLE_USER,
        payload: userId
    }
};

export const getUsersThunk = () => async (dispatch) => {
    const res = await fetch("/api/users");
    const data = await res.json();
    dispatch(getUsers(data.users))
};

export const getSingleUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(getSingleUser(data))
};

const initialState = { allUsers: [], byId: {} };

const userReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_USERS:
            newState.allUsers = action.payload;
            action.payload.forEach(user => {
                newState.byId[user.id] = user;
            })
            return newState
        case GET_SINGLE_USER:
            newState.byId[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default userReducer;
