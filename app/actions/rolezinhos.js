import * as c  from "../common/constants";
import request from "../common/request";

export function getRolezinhos() {
    return (dispatch) => {
        request({
            url: "/rolezinhos",
            method: "GET",
        }).then((response) => {
            dispatch({ type: c.FETCH_ROLEZINHOS, rolezinhos: response })
        });
    }
}
