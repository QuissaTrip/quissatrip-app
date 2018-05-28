import * as c           from "../common/constants";

const initialUser = {
    name: "",
    id: null,
    avatar: null
};

let initialState = {
    user: initialUser,
    error: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_USER: {
            const user = action.user;

            return {
                ...state,
                user
            }
        }
        case c.LOGOUT: {
            const user = initialUser;
            const error = [];
            return {
                ...state,
                user,
                error
            }
        }
        case c.FETCH_USER_ERROR: {
            const error = action.error;

            return {
                ...state,
                error
            }
        }
        default:
            return state;
    }
};
