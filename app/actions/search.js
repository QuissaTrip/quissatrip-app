import * as c       from "../common/constants";
import request      from "../common/request";
import { objToUrl } from "../common/helpers";

export function searchOnAPI(query = null) {
    return (dispatch, getState) => {
        let params = {};
        const filters = getState().search.filters;

        if (query !== null) {
            params["query"] = query;
        }

        if (filters.length > 0) {
            for (let key in filters) {
                if (filters[key] !== null) {
                    params[key] = filters[key];
                }
            }
        }

        console.log(params);

        const url = "/search" + objToUrl(params);

        request({
            url: url,
            method: "GET",
        }).then((response) => {
            dispatch({ type: c.FETCH_SEARCH, search: response.search })
        });
    }
}
