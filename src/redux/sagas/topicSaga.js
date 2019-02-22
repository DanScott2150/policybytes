import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

//gets all topics from database
function* fetchAllTopics(action){
    try{

        //topicResponse sends get request to router '/api/topic/alltopics' and 
        //receives back all topics from the database and stores them in topicResponse.data
        const topicResponse = yield call(axios.get, '/api/topic/alltopics')

        //sends all topics to allTopics reducer via action 'SET_ALL_TOPICS'
        //and payload topicResponse.data
        yield put({
            type: 'SET_ALL_TOPICS',
            payload: topicResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting topics: ', error);
    }
}

//gets the featured topic to be displayed on the topic page from the database
function* fetchFeaturedTopicPage(action){
    try{

        //topicResponse sends get request to router '/api/topic/featuredtopic' and 
        //receives back the topic admin wants to be the featured topic for the topic
        //page and stores it in topicResponse.data
        const topicResponse = yield call(axios.get, '/api/topic/featuredtopic')

        //sends new featured topic to featuredTopicPage reducer via action 'SET_FEATURED_TOPIC_TOPIC_PAGE'
        //and payload topicResponse.data
        yield put({
            type: 'SET_FEATURED_TOPIC_TOPIC_PAGE',
            payload: topicResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting topic: ', error);
    }
}

//gets all of the archived topics for displaying them on the landing page
function* fetchArchivedTopics(action){
    try{

        //archivedResponse sends get request to router '/api/topic/archived' and 
        //receives back all archived topics and store them in archivedResponse.data
        const archivedResponse = yield call(axios.get, '/api/topic/archived')

        //sends all archived topics to archivedTopics reducer via action 'SET_ARCHIVED_TOPICS'
        //and payload archivedResponse.data
        yield put({
            type: 'SET_ARCHIVED_TOPICS',
            payload: archivedResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting archived topics: ', error);
    }
}

//posts a new topic to the database
function* setNewTopic(action){
    try{

        //posts new topic to the database via axios.post
        //action.payload contains the new topic
        yield call(axios.post, '/api/topic/newtopic', action.payload)
        yield put ({
            type: 'FETCH_ALL_TOPICS'
        })

    //if there is an error in sending post request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in posting new topic: ', error);
    }
}

//updates topic admin edited
function* updateTopic(action){
    try{
        yield call(axios.put, '/api/topic/updatetopic', action.payload)
        yield put({
            type: 'FETCH_ALL_TOPICS'
        })

    }catch(error){
        console.log('Error in updating topic: ', error);
    }
}

//WRITTEN BY ATTICUS
function* togglePublishedSaga(action) {
    try {
        yield call (axios.put, '/api/topic/togglePublished', action.payload)
        yield put ({
            type: 'FETCH_ALL_TOPICS'
        })
    } catch (error) {
        console.log('Error togglePublishedSaga: ', error)
    }
}

//WRITTEN BY ATTICUS
function* toggleFeaturedSaga(action) {
    try {
        yield call (axios.put, '/api/topic/toggleFeatured', action.payload)
        yield put ({
            type: 'FETCH_ALL_TOPICS'
        })
    } catch (error) {
        console.log('Error toggleFeaturedSaga: ', error)
    }
}

function* deleteTopicSaga(action) {
    try {
        yield call (axios.delete, `/api/topic/deleteTopic/${action.payload}`);
        yield put ({
            type: 'FETCH_ALL_TOPICS'
        })
    } catch (error) {
        console.log('Error deleteTopicSaga: ', error);

    }
}


//WRITTEN BY ATTICUS
function* fetchEditTopicInfoSaga(action) {
    try {
         let fetchedEditTopic = yield call (axios.get, `/api/topic/fetchEditTopicInfo/${action.payload}`)
         console.log('fetched edit topic',fetchedEditTopic.data);
         
        yield put ({
            type: 'CACHE_TOPIC_TO_EDIT',
            payload: fetchedEditTopic.data
        })

    } catch (error) {
        console.log('Error fetchEditTopicInfoSaga: ', error);
    }
}

//WRITTEN BY ATTICUS 
function* fetchTopicPageContentSaga(action) {
    try {
        console.log('in topicSaga fetchTopicPageContent, id:', action.payload);
                                                //below: using the same GET route as the editTopicInfo above but
                                                //storing it in a different reducer
        let fetchedTopicPageContent = yield call (axios.get, `/api/topic/fetchEditTopicInfo/${action.payload}`)
        console.log('fetchedTopicPageContent: ',fetchedTopicPageContent);
        
        yield put({
            type: 'SET_TOPIC_PAGE_CONTENT',
            payload: fetchedTopicPageContent.data
        })

    } catch (error) {
        console.log('Error fetchTopicPageContentSaga: ', error)
    }
}






function* topicSaga() {
    yield takeLatest('FETCH_ALL_TOPICS', fetchAllTopics)
    // yield takeLatest('FETCH_ALL_KEY_CLAIMS', fetchAllKeyClaims)
    // yield takeLatest('FETCH_ALL_STREAMS', fetchAllStreams)
    // yield takeLatest('FETCH_ALL_CONTRIBUTORS', fetchAllContributors)
    // yield takeLatest('FETCH_ALL_PROPOSALS', fetchAllProposals)
    // yield takeLatest('FETCH_ALL_LIKES', fetchAllLikes)
    // yield takeLatest('FETCH_ALL_LOVES', fetchAllLoves)
    yield takeLatest('FETCH_NEW_TOPIC_TOPIC_PAGE', fetchFeaturedTopicPage)
    yield takeLatest('FETCH_ARCHIVED_TOPICS', fetchArchivedTopics)
    yield takeLatest('SET_NEW_TOPIC', setNewTopic)
    yield takeLatest('UPDATE_TOPIC', updateTopic)

    //ATTICUS ADDED:
    yield takeEvery('TOGGLE_PUBLISHED', togglePublishedSaga)
    yield takeEvery('TOGGLE_FEATURED', toggleFeaturedSaga)
    yield takeEvery('DELETE_TOPIC', deleteTopicSaga)
    yield takeEvery('FETCH_EDIT_TOPIC_INFO', fetchEditTopicInfoSaga)
    yield takeEvery('FETCH_TOPIC_PAGE_CONTENT', fetchTopicPageContentSaga)

  }

  export default topicSaga;