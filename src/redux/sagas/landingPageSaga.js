import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Fetches 'Featured Topic' from the database, which then gets displayed on landing page
function* fetchFeaturedTopicLanding(action){
    try{
        // Send API call to backend
        // Return value is the topic that currently has 'featured' set to TRUE
        // Due to the way it's configured, only one topic will ever be returned
        const topicResponse = yield call(axios.get, '/api/topic/featuredlanding');

        console.log("topicResponse.data: ", topicResponse.data);
        // Send data to landingPageReducer.js
        yield put({
            type: 'SET_FEATURED_TOPIC_LANDING_PAGE',
            payload: topicResponse.data
        });
    } catch(error) {
        console.log('[landingPageSaga] Error in getting topic: ', error);
    }
}

// Get landing page text. Editable via Admin Panel
function* fetchLandingHeader(action){
    try{
        const landingHeader = yield call(axios.get, '/api/topic/meta');
        console.log("Landing Saga: ", landingHeader);
        yield put({
            type: 'SET_LANDING_PAGE_HEADER',
            payload: landingHeader.data
        });
    } catch (error) {
        console.log('[landingPageSaga] Error in getting site header', error);
    }
}

// Get landing page text. Editable via Admin Panel
function* fetchLandingEdit(action) {
    try {
        const landingEdit = yield call(axios.get, '/api/topic/meta');
        yield put({
            type: 'SET_LANDING_PAGE_EDIT',
            payload: landingEdit.data
        });
    } catch (error) {
        console.log('[landingPageSaga] Error in getting site header', error);
    }
}

function* updateLanding(action) {
    try {
        console.log("Update Saga: ", action.payload);
        yield call(axios.put, '/api/topic/meta', action.payload)
        yield put({
            type: 'FETCH_LANDING_HEADER'
        })

    } catch (error) {
        console.log('Error in updating topic: ', error);
    }
}

// Fetches all archived topics from the database, which then gets displayed on the landing page
function* fetchArchivedTopics(action){
    try {

        // Send API call to backend
        // Returns all topics where 'published' is TRUE and 'featured' is FALSE
        const archivedResponse = yield call(axios.get, '/api/topic/archived');

        // Send data to landingPageReducer.js
        yield put({
            type: 'SET_ARCHIVED_TOPICS',
            payload: archivedResponse.data
        });
    } catch(error) {
        console.log('[landingPageSaga] Error in getting archived topics: ', error);
    }
}

function* landingSaga() {
    yield takeLatest('FETCH_NEW_TOPIC_LANDING_PAGE', fetchFeaturedTopicLanding)
    yield takeLatest('FETCH_ARCHIVED_TOPICS', fetchArchivedTopics)
    yield takeLatest('FETCH_LANDING_HEADER', fetchLandingHeader)
    yield takeLatest('FETCH_LANDING_EDIT', fetchLandingEdit)
    yield takeLatest('UPDATE_LANDING', updateLanding)
}

export default landingSaga;