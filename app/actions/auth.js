import * as c  from "../common/constants.js";
import request from "../common/request.js";

export function login(email, password) {
    return (dispatch) => {
        request({
            url: "/user/login",
            method: "POST",
            data: {
                email: email,
                password: password
            }
        }).then((response) => {
            dispatch({ type: c.FETCH_USER, user: response.user })
        });
    }
}
