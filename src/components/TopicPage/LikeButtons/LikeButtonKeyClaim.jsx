import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { Panel, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

import '../TopicPage.css'

class LikeButtonKeyClaim extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likedKeyClaim: false,
            count: 0
        };
    }


    componentDidMount = () => {
        if (this.props.id) {
            this.getKeyClaimLikes(this.props.id);
            console.log('componentDidMount, this.props.id', this.props.id);

        }
    }


    componentWillReceiveProps = (nextProps) => {

        if (this.props.id == !nextProps.id) {
            this.getKeyClaimLikes(nextProps.id);
            console.log('componentWillReceiveProps, nextProps', nextProps.id);
            console.log('componentWillReceiveProps, this.props', nextProps.id);
        }
    }

    getKeyClaimLikes = (id) => {
        axios.get(`/api/likes/get/keyClaim/${id}`)
            .then((response) => {
                console.log('here is response from axios.get', response.data);
                if (!response.data[0]) {
                    this.setState({
                        count: 0
                    })

                } else {
                    this.setState({
                        count: response.data[0].count
                    })

                }
                console.log('this is state.count', this.state.count);
            }).catch((err) => {
                console.log(err)
            });

    }

    likeKeyClaim = (id) => {

        this.setState({
            likedKeyClaim: !this.state.likedKeyClaim
        }, () => {

            let likeToPut = {
                columnName: 'key_claim_id'
            };
            axios.put(`/api/likes/increment/${id}`, likeToPut)
                .then((response) => {
                    this.getKeyClaimLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

    unlikeKeyClaim = (id) => {
        this.setState({
            likedKeyClaim: !this.state.likedKeyClaim
        }, () => {

            let likeToPut = {
                columnName: 'key_claim_id'
            };
            axios.put(`/api/likes/decrement/${id}`, likeToPut)
                .then((response) => {
                    this.getKeyClaimLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }


    render() {

        if (this.props.user.userInfo) {

            return (

                <span>{!this.state.likedKeyClaim ? <Button className="keyClaimFooterItem" onClick={() => this.likeKeyClaim(this.props.id)} ><Glyphicon glyph="thumbs-up" /> {this.state.count}</Button> : <Button className="keyClaimFooterItem" bsStyle="success" onClick={() => this.unlikeKeyClaim(this.props.id)} ><Glyphicon glyph="thumbs-up" /> {this.state.count}</Button>}</span>

            )
        } else {
            return (

                <span> <Button disabled className="keyClaimFooterItem" onClick={() => this.likeKeyClaim(this.props.id)} ><Glyphicon glyph="thumbs-up" /> {this.state.count}</Button></span>

            )

        }
    }
}

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps)(LikeButtonKeyClaim);






