import { OPEN_APP_COUNTER } from "../common/constants"

export function addCounter(artist) {
    return (dispatch) => {
        dispatch({ type: OPEN_APP_COUNTER });
    }
}
