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
            <div id="footerBody">
            <Grid>
                <Row>
                    <Col xs={12} sm={4} md={4}>
                        <div id="footerNewsletter">
                            <h4>Newsletter</h4>
                            <form action="" method="post">
                                <input type="text" placeholder="Name"/>
                                <br/>
                                <input type="text" placeholder="Email"/>
                                <br/>
                                <Button bsStyle="primary" type="submit" id="newsletterSubmit">Submit</Button>
                            </form>
                        </div>
                    </Col>

                    <Col xs={12} sm={4} md={4}>
                        <div id="footerLinks">
                            <Col xs={6} sm={6} md={6}>
                                <p>
                                    <a href="https://citizensleague.org/who-we-are/">About Us</a>    
                                </p>
                                <br/>
                                <p>
                                    <a href="https://citizensleague.org/who-we-are/#staff">Board of Directors</a>    
                                </p>
                                <br/>
                                <p>
                                    <a href="https://citizensleague.org/projects/">Projects</a>    
                                </p>
                                
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <p>
                                    <a href="https://citizensleague.org/events/">Events</a>    
                                </p>
                                <br/>
                                <p>
                                    <a href="https://citizensleague.org/blog/">Blog</a>    
                                </p>
                                <br/>
                                <p>
                                    <a href="https://citizensleague.org/contact/">Contact</a>    
                                </p>
                            </Col>
                        </div>
                    </Col>

                    <Col xs={12} sm={4} md={4}>
                        <div id="footerAddress">
                            <p>
                                <strong>Citizens League</strong> <br/>
                                400 Robert St. N, Suite 1820 <br/>
                                St. Paul, MN 55101 <br/>
                                (651 293-0575)
                            </p>    
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/citizensleague"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/CitizensLeague"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
                                </li>
                                <li>
                                    <a href="https://citizensleague.org/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </div>
                    </Col>


                    </Row>
                </Grid>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Footer);
