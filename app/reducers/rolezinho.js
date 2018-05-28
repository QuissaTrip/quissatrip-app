import * as c from "../common/constants";

let initialState = {
    rolezinhos: 0,
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
