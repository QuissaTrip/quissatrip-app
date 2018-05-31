import * as c       from "../common/constants";
import request      from "../common/request";
import { objToUrl } from "../common/helpers";

export function setCircuit(circuit_id) {
    return (dispatch) => {
        dispatch({ type: c.SET_FILTER_CIRCUIT, circuit_id: circuit_id })
    }
}

export function setTime(type, time) {
    return (dispatch) => {
        if (type == "open") {
            dispatch({ type: c.SET_FILTER_OPEN, time: time });
        } else {
            dispatch({ type: c.SET_FILTER_CLOSE, time: time });
        }
    }
}

export function setType(type) {
    return (dispatch) => {
        dispatch({ type: c.SET_FILTER_TYPE, filterType: type })
    }
}

export function searchOnAPI(query = null) {
    return (dispatch, getState) => {
        let params = {};
        const filters = getState().search.filters;

        if (query !== null && query !== "" && query !== " ") {
            params["query"] = query;
        }

        for (let key in filters) {
            if (filters[key] !== null) {
                params[key] = filters[key];
            }
        }

        const url = "/search" + objToUrl(params);

        request({
            url: url,
            method: "GET",
        }).then((response) => {
            dispatch({ type: c.FETCH_SEARCH, search: response.search })
        });
    }
}
