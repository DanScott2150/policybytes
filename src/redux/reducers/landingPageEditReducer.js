import { combineReducers } from 'redux';

let emptyLandingCache = {
    landingTitle: '',
    header: ''
}

const landingEditCache = (state = emptyLandingCache, action) => {
    switch (action.type) {

        //RETURN CURRENT STATE ITEM xxx
        case 'FETCH_EDIT_LANDING_CACHE':
            return state; 

        //SET REDUX STORE TO HOLD SELECTED TOPIC TO BE EDITED  xxx
        case 'CACHE_LANDING_EDIT':
            console.log("3) [landingPageEditReducer] Cache_Landing_Edit")
            console.log("action.payload: ", action.payload);
            return action.payload;

        case 'CHANGE_LANDING_HEADER':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }

        default:
            return state
    }
}

export default combineReducers({
    landingEditCache
})