import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Button, Grid, Row, Col } from 'react-bootstrap';


import './Footer.css';


const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
});

class Footer extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }



    render() {
        return (
            <div id="footerBody" className="p-4">
                <h5>PolicyBytes - 2019</h5>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Footer);
