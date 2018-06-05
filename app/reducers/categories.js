import * as c from "../common/constants";

let initialState = {
    categories: [],
    categoryList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case c.CATEGORIES: {
            const categories = action.categories;
            return {
                ...state,
                categories
            }
        }
        case c.CATEGORY_LIST: {
            const categoryList = action.categoryList;
            return {
                ...state,
                categoryList
            }
        }
        default:
            return state;
    }
};
