import * as c  from "../common/constants.js";
import request from "../common/request.js";

export function getPlaces() {
    return (dispatch) => {
        request({
            url: "/places",
            method: "GET",
        }).then((response) => {
            dispatch({ type: c.FETCH_PLACES, places: response })
        });
    }
}
