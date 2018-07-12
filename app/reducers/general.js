import * as c from "../common/constants";

let initialState = {
    events: [],
    cityInfo: null
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
        case c.FETCH_CITY_INFO: {
            const cityInfo = action.cityInfo;
            return {
                ...state,
                cityInfo
            }
        }
        default:
            return state;
    }
};
