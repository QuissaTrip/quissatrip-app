import { ToastAndroid } from 'react-native';

export function toastBottom(message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25, 50
    );
}
