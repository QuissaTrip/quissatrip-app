import { OPEN_APP_COUNTER } from "../common/constants";

let initialState = {
    openAppCounter: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_APP_COUNTER:
        {
            let openAppCounter = state.openAppCounter;

            openAppCounter += 1;

            return {
                ...state,
                openAppCounter
            }
        }
        default:
            return state;
    }
};
