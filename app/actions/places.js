import * as c  from "../common/constants.js";
import request from "../common/request.js";

export function getPlaces(circuitID = null) {
    const url = (circuitID !== null)
                ? "/places?circuit=" + circuitID
                : "/places";
    return (dispatch) => {
        request({
            url: url,
            method: "GET",
        }).then((response) => {
            if (circuitID !== null)
                dispatch({ type: c.FETCH_PLACES_OF_CIRCUIT, circuits: response })
            else
                dispatch({ type: c.FETCH_PLACES, places: response })
        });
    }
}
