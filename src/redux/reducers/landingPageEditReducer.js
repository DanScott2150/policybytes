import { combineReducers } from 'redux';

const emptyLandingCache = [];

const landingEditCache = (state = emptyLandingCache, action) => {
    switch (action.type) {
        // case 'CHANGE_LANDING_TEXT':
        //     return {
        //         ...state,
        //         [action.payload.name]: action.payload.value,
        //     }

        default:
            return state
    }
}

export default combineReducers({
    landingEditCache
})