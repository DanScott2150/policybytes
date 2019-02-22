import { combineReducers } from 'redux';

//commentsGeneral contains all comments based on topic id that were not direct comments
//to key claims or any claim of a stream
const commentsGeneral = (state = [], action) => {

    //sets state of commentsGeneral to an array of objects where those objects are comments
    //and the user id and topic id of those comments
    if (action.type === 'SET_GENERAL_COMMENTS') {
        return action.payload
    }

    //if action 'SET_GENERAL_COMMENTS' is not received, state is set to its default empty array
    return state
}

// const currentCommentGeneral = (state = '', action) => {

//     //sets state of commentsGeneral to an array of objects where those objects are comments
//     //and the user id and topic id of those comments
//     if(action.type === 'SET_CURRENT_COMMENT_GENERAL'){
//         return action.payload
//     }

//     //if action 'SET_GENERAL_COMMENTS' is not received, state is set to its default empty array
//     return state
// }


const keyClaimComment = (state = {}, action) => {

    if (action.type === 'SET_KEY_CLAIM_COMMENT') {
        console.log('inside keyClaimComment reducer, here is state', action.payload);
        return action.payload
    } else if (action.type === 'CLEAR_KEY_CLAIM_COMMENT') {
        return {};
    }

    return state
}

const streamComment = (state = {}, action) => {

    if (action.type === 'SET_STREAM_COMMENT') {
        console.log('inside streamComment reducer, here is state', action.payload);
        return action.payload
    } else if (action.type === 'CLEAR_STREAM_COMMENT') {
        return {};
    }

    return state
}

const proposalComment = (state = {}, action) => {

    if (action.type === 'SET_PROPOSAL_COMMENT') {
        return action.payload
    } else if (action.type === 'CLEAR_PROPOSAL_COMMENT') {
        return {};
    }

    return state
}



export default combineReducers({
    commentsGeneral,
    keyClaimComment,
    streamComment,
    proposalComment

})