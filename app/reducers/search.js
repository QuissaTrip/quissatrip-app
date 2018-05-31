import * as c from "../common/constants";

let initialState = {
    search: null,
    filters: {
        type: null, // ["place", "commerce", "event"]
        circuit_id: null, // circuit_id
        open: null, //[14-51]
        close: null
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_SEARCH: {
            const search = action.search;
            return {
                ...state,
                search
            }
        }
        case c.SET_FILTER_CIRCUIT: {
            let filters = state.filters;
            filters.circuit_id = action.circuit_id;

            return {
                ...state,
                filters
            }
        }
        case c.SET_FILTER_TYPE: {
            let filters = state.filters;
            filters.type = action.filterType;

            return {
                ...state,
                filters
            }
        }
        case c.SET_FILTER_OPEN:
        case c.SET_FILTER_CLOSE: {
            let filters = state.filters;
            if (action.type == c.SET_FILTER_OPEN)
                filters.open = action.time;
            else
                filters.close = action.time;

            return {
                ...state,
                filters
            }
        }
        default:
            return state;
    }
};
