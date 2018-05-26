import axios from 'axios';

const BASE_URL = "http://lucascraveiropaes.com/app";
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': 'pt-BR,pt;q=0.5'
    }
});

const request = function(options) {
    const onSuccess = (typeof options.onSuccess !== "undefined") ? options.onSuccess :
        (response) => {
        console.debug(response);
        return response.data;
    }
    const onError = (typeof options.onError !== "undefined") ? options.onError :
        (error) => {
        console.debug(error);
        return false;
    }
    return client(options).then(onSuccess).catch(options.onError);
}

export default request;
