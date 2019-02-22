import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const userInfo = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {id: action.user.id, userName: action.user.user_name, status: action.user.status, firstName: action.user.first_name, fbPicture: action.user.fb_picture, email: action.user.email} || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  userInfo,
  isLoading,
});
