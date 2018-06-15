import * as c from "../common/constants";

let initialState = {
    categories: [],
    commerces: {},
    commerce_single: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.FETCH_COMMERCE_CATEGORIES: {
            const categories = action.categories;
            return {
                ...state,
                categories
            }
        }
        case c.FETCH_COMMERCES: {
            let commerces = state.commerces;

            if (typeof action.commerceID !== "undefined" && action.commerceID !== 0) {
                commerces[action.commerceID] = action.commerces;
            }

            return {
                ...state,
                commerces
            }
        }
        case c.FETCH_COMMERCE_SINGLE: {
            const commerce_single = action.commerce;
            return {
                ...state,
                commerce_single
            }
        }
        default:
            return state;
    }
};
