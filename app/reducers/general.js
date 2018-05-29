import * as c from "../common/constants";

let initialState = {
    circuits: [],
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
        default:
            return state;
    }
};
