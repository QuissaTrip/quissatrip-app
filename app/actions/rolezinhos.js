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
    let formMedia = new FormData();
    //formMedia.append('user_id', userID);
    formMedia.append('media', {
        uri: media,
        type: 'image/jpeg', // or photo.type
        name: 'media'
    });

    return (dispatch) => {
        request({
            url: "/rolezinho/new",
            method: "POST",
            headers: { 'content-type': 'multipart/form-data' },
            data: {
                media: formMedia
            }
        }).then((response) => {
            console.log(response);
            ToastAndroid.showWithGravityAndOffset(
                response.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25, 50
            );
        });
    }
}
