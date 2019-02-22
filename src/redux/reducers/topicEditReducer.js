import { combineReducers } from 'redux';

//allTopics contains all topics from the database
const allTopics = (state = [], action) => {
    

    //sets state of allTopics to an array of objects where each object is a topic
    //with the topic text, premise, common ground, published date, archived status,
    //archived summary, and an archived date
    if (action.type === 'SET_ALL_TOPICS'){
        
        return action.payload
    }

    //if action 'SET_ALL_TOPICS' is not received, state is set to its 
    //default empty array
    return state
}

//featuredTopicPage contains the information needed for the featured topic
//on the Topic Page
const featuredTopicPage = (state = [], action) => {

    //sets state of featuredTopicPage to an array of objects where each object is a section
    //of the topic edit page e.g. one object would be the Topic Title, another
    //object would be Topic Summary, etc.
    if (action.type === 'SET_FEATURED_TOPIC_TOPIC_PAGE'){
        return action.payload
    }

    //if action 'SET_FEATURED_TOPIC_TOPIC_PAGE' is not received, state is set to its 
    //default empty array
    return state
}



//archivedTopics contains all of the archived topics from the database
const archivedTopics = (state = [], action) => {

    //sets state of archivedTopics to an array of objects where those objects are 
    //all archived topics
    if(action.type === 'SET_ARCHIVED_TOPICS'){
        return action.payload
    }

    //if action 'SET_ARCHIVED_TOPCS' is not received, state is set to its default 
    //empty array
    return state
} 


export default combineReducers({
    allTopics,
    featuredTopicPage,
    archivedTopics
})