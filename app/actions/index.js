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
