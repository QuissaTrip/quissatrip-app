import * as c from "../common/constants";

let initialState = {
    places: [],
    place: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_PLACES: {
            const places = action.places;

            return {
                ...state,
                places
            }
        }
        case c.FETCH_SINGLE_PLACE: {
            const place = action.place;
            return {
                ...state,
                place
            }
        }
        default:
            return state;
    }
};
