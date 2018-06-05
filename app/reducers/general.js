import * as c from "../common/constants";

let initialState = {
events: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_EVENTS: {
            const events = action.events;
            return {
                ...state,
                events
            }
        }
        default:
            return state;
    }
};
