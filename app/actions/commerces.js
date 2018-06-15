import * as c  from "../common/constants.js";
import request from "../common/request.js";

export function getCommerceCategories() {
    return (dispatch) => {
        request({
            url: "/commerces/categories",
            method: "GET",
        }).then((categories) => {
            dispatch({ type: c.FETCH_COMMERCE_CATEGORIES, categories: categories })
        });
    }
}

export function getCommerces(id = null) {
    if (id !== null) {
        return (dispatch) => {
            request({
                url: "/commerces?category=" + id,
                method: "GET",
            }).then((commerces) => {
                dispatch({ type: c.FETCH_COMMERCES, commerces: commerces, commerceID: id })
            });
        }
    }
    return null;
}
