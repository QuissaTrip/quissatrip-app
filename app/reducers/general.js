import * as c from "../common/constants";

let initialState = {
    circuits: [],
    events: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.CIRCUITS: {
            const circuits = action.circuits;
            return {
                ...state,
                circuits
            }
        }
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
