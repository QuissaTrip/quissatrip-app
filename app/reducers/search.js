import * as c from "../common/constants";

let initialState = {
    search: null,
    filters: {
        type: null, // ["is_place", "is_commerce", "is_event"]
        circuit_id: null, // circuit_id
        open: null, //[14-51]
        close: null
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_SEARCH:
        {
            const search = action.search;
            return {
                ...state,
                search
            }
        }
        default:
            return state;
    }
};
