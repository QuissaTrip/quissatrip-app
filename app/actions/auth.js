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
            }
        });
    }
}

export function updateProfile(user) {
    let data = new FormData();
    data.append('user_id', user.user_id);
    data.append('name', user.name);
    data.append('email', user.email);
    data.append('password', user.password);
    data.append('cpf', user.cpf);
    data.append('token', user.token);
    data.append('avatar', {
        uri: user.avatar,
        name: "media.jpg",
        type: 'image/jpg'
    });

    return (dispatch) => {
        request({
            url: "/user/update",
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"',
            }
        }).then((response) => {
            console.log(response);
            if (response.status) {
                toastBottom("Seu perfil foi atualizado com sucesso!");
                dispatch({ type: c.FETCH_USER, user: response.user });
            } else {
                toastBottom(response.errors[0]);
            }
        });
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({ type: c.LOGOUT });
    }
}
