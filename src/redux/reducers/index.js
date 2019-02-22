import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import topics from './topicEditReducer'; 
import comments from './commentReducer'; 
import cacheEdit from './atticusTopicEditReducer'; 
import topicPageContent from './topicPageReducer.js';
import landing from './landingPageReducer' 


const store = combineReducers({
  user,
  login,
  topics,
  comments,
  cacheEdit,
  topicPageContent,
  landing

});

export default store;
