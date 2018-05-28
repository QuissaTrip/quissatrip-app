import { ToastAndroid } from 'react-native';
import * as c           from "../common/constants";
import request          from "../common/request";

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

export function newRolezinho(userID, media, text, token) {
    let data = new FormData();
    data.append('user_id', userID);
    data.append('text', text);
    data.append('token', token);
    data.append('media', {
        uri: media,
        name: "media.jpg",
        type: 'image/jpg'
    });

    return (dispatch) => {
        request({
            url: '/rolezinho/new',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"',
            }
        }).then(response => {
            ToastAndroid.showWithGravityAndOffset(
                response.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25, 50
            );
        }).catch(error => {
            console.log(error);
        });
    }
}

export function deleteReportRolezinho(roleID, userID, token, type="delete") {
    const url = (type == "delete") ? "/rolezinho/delete" : "/rolezinho/report";

    return (dispatch) => {
        request({
            url: url,
            method: 'POST',
            data: {
                id: roleID,
                user_id: userID,
                token: token
            },
        }).then(response => {
            ToastAndroid.showWithGravityAndOffset(
                response.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25, 50
            );
        }).catch(error => {
            console.log(error);
        });
    }
}
