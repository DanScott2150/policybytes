import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setNewGeneralComment(action) {
    try {
        yield call (axios.post, '/api/comments/addComment', action.payload)
        yield put ({
            type: 'FETCH_GENERAL_COMMENTS',
            payload: action.payload
        })
    } catch (error) {
        console.log('Error setNewGeneralComment Saga: ', error)
    }
}

function* likeGeneralComment(action) {
    try {
        yield call (axios.put, `/api/comments/likeincrement/${action.payload.id}`, action.payload)
        yield put ({
            type: 'FETCH_GENERAL_COMMENTS',
            payload: action.payload
        })
    } catch (error) {
        console.log('Error likeGeneralComment Saga: ', error)
    }
}

function* unlikeGeneralComment(action) {
    try {
        yield call (axios.put, `/api/comments/likedecrement/${action.payload.id}`, action.payload)
        yield put ({
            type: 'FETCH_GENERAL_COMMENTS',
            payload: action.payload
        })
    } catch (error) {
        console.log('Error likeGeneralComment Saga: ', error)
    }
}



function* deleteGeneralComment(action) {
    try {
        yield call (axios.delete, `/api/comments/deleteComment/${action.payload.id}`);
        yield put ({
            type: 'FETCH_GENERAL_COMMENTS',
            payload: action.payload
        })
    } catch (error) {
        console.log('Error deleteCommentSaga: ', error);

    }
}

//gets all of the general comments based on the given topic id to display them on the topic page
function* fetchGeneralComments(action){
    try{

        //commentResponse sends get request to router '/api/topic/generalcomments' and 
        //receives back all general comments and store them in commentResponse.data
        const commentResponse = yield call(axios.get, `/api/comments/getGeneralcomments/${action.payload.topic_id}`)

        //sends all general comments to commentsGeneral reducer via action 'SET_GENERAL_COMMENTS'
        //and payload commentResponse.data
        yield put({
            type: 'SET_GENERAL_COMMENTS',
            payload: commentResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting general comments: ', error);
    }
}

//gets all of the comments for all key claims based on the given topic id to display them on the topic page
function* fetchKeyClaimComments(action){
    try{

        //commentResponse sends get request to router '/api/topic/keyclaimcomments' and 
        //receives back comments on all key claims of a topic and store them in commentResponse.data
        const commentResponse = yield call(axios.get, '/api/comments/keyclaimcomments')

        //sends all general comments to commentsKeyClaim reducer via action 'SET_KEY_CLAIM_COMMENTS'
        //and payload commentResponse.data
        yield put({
            type: 'SET_KEY_CLAIM_COMMENTS',
            payload: commentResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting key claim comments: ', error);
    }
}

//gets all of the comments for all stream items based on the given topic id to display them on the topic page
function* fetchStreamComments(action){
    try{

        //commentResponse sends get request to router '/api/topic/streamcomments' and 
        //receives back all comments in a stream and store them in commentResponse.data
        const commentResponse = yield call(axios.get, '/api/comments/streamcomments')

        //sends all general comments to commentsStream reducer via action 'SET_STREAM_COMMENTS'
        //and payload commentResponse.data
        yield put({
            type: 'SET_STREAM_COMMENTS',
            payload: commentResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting stream comments: ', error);
    }
}

function* commentSaga() {

    yield takeLatest('SET_NEW_COMMENT', setNewGeneralComment)
    yield takeLatest('FETCH_GENERAL_COMMENTS', fetchGeneralComments)
    yield takeLatest('FETCH_KEY_CLAIM_COMMENTS', fetchKeyClaimComments)
    yield takeLatest('FETCH_STREAM_COMMENTS', fetchStreamComments)
    yield takeLatest('DELETE_GENERAL_COMMENT', deleteGeneralComment)
    yield takeLatest('LIKE_GENERAL_COMMENT', likeGeneralComment)
    yield takeLatest('UNLIKE_GENERAL_COMMENT', unlikeGeneralComment)

  }

  export default commentSaga;