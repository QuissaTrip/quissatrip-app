import * as c  from "../common/constants.js";
import request from "../common/request.js";

export function getEntity(id = null) {
    if (id !== null) {
        return (dispatch) => {
            request({
                url: "/entity/" + id,
                method: "GET",
            }).then((response) => {
                dispatch({ type: c.FETCH_SINGLE_PLACE, place: response })
            });
        }
    }
}

export function getCityInfo() {
    return (dispatch) => {
        request({
            url: "/files/city-info.json",
            method: "GET",
        }).then((response) => {
            dispatch({ type: c.FETCH_CITY_INFO, cityInfo: response })
        });
    }
}

export function getCategories(id = null) {
    let url = "/categories";
    if (id !== null) {
        url = "/places?category=" + id;
    }

    return (dispatch) => {
        request({
            url: url,
            method: "GET",
        }).then((response) => {
            if (id !== null) {
                dispatch({ type: c.CATEGORY_LIST, categoryList: response })
            } else {
                dispatch({ type: c.CATEGORIES, categories: response })
            }
        });
    }
}

export function getEvents() {
    return (dispatch) => {
        request({
            url: "/events",
            method: "GET",
        }).then((events) => {
            dispatch({ type: c.FETCH_EVENTS, events: events })
        });
    }
}
