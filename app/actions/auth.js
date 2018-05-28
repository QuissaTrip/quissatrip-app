import * as c           from "../common/constants";
import request          from "../common/request";
import { toastBottom }  from '../common/helpers';

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

// Data = name, email, password, cpf, avatar
export function register(data) {
    return (dispatch) => {
        request({
            url: "/user/new",
            method: "POST",
            data: data
        }).then((response) => {
            if (response.status) {
                toastBottom("Seja bem vindo, " + response.user.name.split(" ")[0]);
                dispatch({ type: c.FETCH_USER, user: response.user });
            } else {
                toastBottom(response.errors[0]);
                dispatch({ type: c.FETCH_USER_ERROR, error: response.errors });
            }
        });
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({ type: c.LOGOUT });
    }
}
