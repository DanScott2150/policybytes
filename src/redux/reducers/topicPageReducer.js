import { combineReducers } from 'redux';

let emptyTopicEditCache = {
    topicDBId: '',
    topicTitle: '',
    topicSummary: '',
    topicPremise: '',
    topicReadMore: '',
    topicCommonGround: '',
    contributor1DbId: '',
    contributor1FirstName: '',
    contributor1LastName: '',
    bio1: '',
    photo1: '',
    proposal1DbId: '',
    proposal1: '',
    contributor2DbId: '',
    contributor2FirstName: '',
    contributor2LastName: '',
    bio2: '',
    photo2: '',
    proposal2DbId: '',
    proposal2: '',
    keyClaims: {
        0: {
            claimDbId: '', //<--- this comes from the database, doesn't really affect DOM placement
            claimContributor: '',
            keyClaim: '',
            streamData: {
                0: {
                    streamDbId: '', //<--- this comes from the database, doesn't really affect DOM placement
                    streamContributor: '',
                    streamComment: '',
                    streamEvidence: '',
                }
            }
        }
    }
}

const topicPageReducer = (state = emptyTopicEditCache, action) => {
    switch(action.type){
        case 'SET_TOPIC_PAGE_CONTENT':
            return action.payload
        
        default: 
            return state
    }
}



export default combineReducers({
    topicPageReducer,
})