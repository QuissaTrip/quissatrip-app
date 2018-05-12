import * as c from "../common/constants";

let initialState = {
    user: {
        name: "",
        id: null,
        avatar: null
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_USER:
        {
            const user = action.user;

            return {
                ...state,
                user
            }
        }
        default:
            return state;
    }
};
