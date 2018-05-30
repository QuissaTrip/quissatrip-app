import { ToastAndroid } from 'react-native';

export function toastBottom(message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25, 50
    );
}

export function objToUrl(obj) {
    let url = "";
    for (let key in obj) {
        url += (url == "") ? "?" : "&";
        url += key + "=" + encodeURIComponent(obj[key]);
    }
    return url;
}
