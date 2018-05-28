import * as c from "../common/constants";

let initialState = {
    rolezinhos: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_ROLEZINHOS:
        {
            const rolezinhos = action.rolezinhos;
            return {
                ...state,
                rolezinhos
            }
        }
        default:
            return state;
    }
};
