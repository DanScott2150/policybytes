import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from '../../Footer/Footer.jsx'

import { Panel, Tab, Tabs, Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Redirect } from 'react-router';

let debug = false;

class LandingEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false
        }
    }

    componentDidMount() {
        this.populateEditCache();
    }

    populateEditCache = () => {
        this.props.dispatch({
            type: 'FETCH_LANDING_EDIT',
        })
        this.setState({
            edit: true,
        })
    }

    handleTextChange = (event) => {
        this.props.dispatch({
            type: 'CHANGE_LANDING_EDIT',
            payload: event.target
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Update Landing Text: ", this.props.state.landing.landingPageEdit)

        this.props.dispatch({
            type: 'UPDATE_LANDING',
            payload: this.props.state.landing.landingPageEdit
        })
        this.setState({
            submitAlert: true,
        })
    }

    render() {
        
        return (
            <div id="topicEditMaster">
                <div className="wrapper">

                    <h1>Topic Edit</h1>
                    {/* SHOW STATE ON DOM */}
                    {/* <pre>state: {JSON.stringify(this.props.state, null, 3)}</pre> */}

                    <form action="" onSubmit={this.handleSubmit}>
                        <Button type="submit" bsStyle="primary">Submit!</Button>

                        <Panel>
                            <Panel.Body>
                                <ControlLabel>Landing Page Text</ControlLabel>
                                <FormControl onChange={this.handleTextChange}
                                    name="header"
                                    value={this.props.state.landing.landingPageEdit.header}
                                    componentClass="textarea" />
                            </Panel.Body>
                        </Panel>

                    </form>
                    
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
})


export default connect(mapStateToProps)(LandingEdit);
