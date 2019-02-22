import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOGIN_ACTIONS } from '../actions/loginActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callLogin, callLogout } from '../requests/loginRequests';
import axios from 'axios';


// worker Saga: will be fired on "LOGIN" actions

//currently loginFacebookUser is not being used. axios.get to facebook.strategy.js on server is not working
//so get is hardcoded into link from Nav.jsx
// function* loginFacebookUser() {
//   console.log('in loginFacebookUser in login saga')
//   try {  yield call(axios.get, '/api/facebook/send');
//   yield put({
//     type: USER_ACTIONS.FETCH_USER,
//   });
// } catch (error) {
//   console.log('error in loginFacebookUser');
// }
// };

function* loginUser(action) {
  try {
    yield put({ type: LOGIN_ACTIONS.CLEAR_LOGIN_ERROR });
    yield put({ type: LOGIN_ACTIONS.REQUEST_START });
    yield callLogin(action.payload);
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    yield put({
      type: USER_ACTIONS.FETCH_USER,
    });
  } catch (error) {
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    if (error.status === 401) {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED,
        message: error.message,
      });
    } else {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE,
        message: error.message,
      });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    yield callLogout(action);
    yield put({
      type: USER_ACTIONS.UNSET_USER,
    });
  } catch (error) {
    console.log('LOGOUT FAILED -- CHECK YOUR SERVER', error);
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_ACTIONS.LOGIN, loginUser);
  yield takeLatest(LOGIN_ACTIONS.LOGOUT, logoutUser);
  //Not currently working. get facebook is hardcoded into Nav.jsx
  // yield takeEvery('LOGIN_FACEBOOK', loginFacebookUser);
}

export default loginSaga;
