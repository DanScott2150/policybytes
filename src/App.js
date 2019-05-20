import React from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';


import LoginPage from './components/Admin/LoginPage/LoginPage';
import RegisterModal from './components/Admin/RegisterModal/RegisterModal';
import LandingPage from './components/LandingPage/LandingPage.jsx'
import TopicPage from './components/TopicPage/TopicPage.jsx'
import TopicManage from './components/Admin/TopicManage/TopicManage.jsx'
import TopicEdit from './components/Admin/TopicEdit/TopicEdit.jsx';
// import CommentManage from './components/Admin/CommentManage/CommentManage.jsx';
import Images from './components/Images/Images.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import LandingEdit from './components/Admin/LandingEdit/LandingEdit';

// import './styles/main.css';

const App = () => (
  <div>
    
    <Header/>

     <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route
            path="/home"
            component={LandingPage}
          />
          <Redirect exact from="/#/topicPage%0A" to="/topicPage"/>
          <Route
            path="/topicPage"
            component={TopicPage}
          />
          <Route
            path="/admin"
            component={TopicManage}
          />

          <Route
            path="/landingEdit"
            component={LandingEdit}
            />
          <Route
            path="/topicEdit/:id?"  //<-- optional route param is id of topic to populate edit
            component={TopicEdit}
          />
          <Route
            path="/Images"
            component={Images}
          />


          <Route
            path="/login"
            component={LoginPage}
          />
          <Route
            path="/register"
            component={RegisterModal}
          />
          <Route render={() => <h1>404</h1>} />
        </Switch>
    </Router>

    <Footer/>

  </div>
);

export default App;
