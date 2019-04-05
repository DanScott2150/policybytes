// Landing Page Reducer
// Handles displaying the Featured Topic & Archived Topics

import { combineReducers } from 'redux';

let defaultStateArray = [
    {
        id: 0, 
        topic_title: '', 
        published_date: '', 
        first_name: '', 
        last_name: '', 
        bio: '', 
        photo_url: ''
    }, {
        id: 0, 
        topic_title: '', 
        published_date: '', 
        first_name: '', 
        last_name: '', 
        bio: '', 
        photo_url: ''
    }
];

// Landing Page text should be editable via Admin panel
// In the event that something goes wrong, display default text:
const defaultHeader = `
    This site is designed to facilitate better debate.
    You can scan arguments and cut to the chase examining evidence in these curated conversations.
    Creating intentional dialogue that focuses on individual argumentation.`;

// Display 'Featured Topic' on landing page
const featuredLandingPage = (state = defaultStateArray, action) => {

    //sets state of featuredLandingPage to an array of objects where each object is a section
    //of the featured topic on the landing page e.g. contributor names, contributor bios, etc.
    if(action.type === 'SET_FEATURED_TOPIC_LANDING_PAGE'){
        return action.payload
    }

    //if action 'SET_FEATURED_TOPIC_LANDING_PAGE' is not received, state is set to its 
    //default empty array
    return state
}

// Display text on landing page
const landingPageHeader = ( state = defaultHeader, action ) => {
    if (action.type === 'SET_LANDING_PAGE_HEADER'){
        return action.payload;
    }
    return state;
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
    featuredLandingPage,
    archivedTopics,
    landingPageHeader
})