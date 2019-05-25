import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { Button } from 'react-bootstrap';

import '../TopicPage.css'

class LikeButtonProposal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likedProposal: false,
            count: 0
        };
    }

    componentDidMount = () => {
        if (this.props.id) {
            this.getProposalLikes(this.props.id);
            console.log('componentDidMount, this.props.id', this.props.id);

        }
    }

    componentWillReceiveProps = (nextProps) => {

        if (this.props.id === !nextProps.id) {
            this.getProposalLikes(nextProps.id);
            console.log('nextProps', nextProps.id);
            console.log('this.props', nextProps.id);
        }
    }

    getProposalLikes = (id) => {
        axios.get(`/api/likes/get/proposal/${id}`)
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

    likeProposal = (id) => {

        this.setState({
            likedProposal: !this.state.likedProposal
        }, () => {

            let likeToPut = {
                columnName: 'proposal_id'
            };
            axios.put(`/api/likes/increment/${id}`, likeToPut)
                .then((response) => {
                    this.getProposalLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

    unlikeProposal = (id) => {
        this.setState({
            likedProposal: !this.state.likedProposal
        }, () => {

            let likeToPut = {
                columnName: 'proposal_id'
            };
            axios.put(`/api/likes/decrement/${id}`, likeToPut)
                .then((response) => {
                    this.getProposalLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

  render() {
    if (this.props.user.userInfo) {
      return (
        <div style={{float: 'right'}}>
        
          { !this.state.likedProposal ? 
              <Button 
                className="keyClaimFooterItem" 
                variant="light"
                onClick={() => this.likeProposal(this.props.id)} >
                <i className="fa fa-thumbs-up" /> &nbsp;
                  {this.state.count}
                </Button> : 
              <Button 
                className="keyClaimFooterItem" 
                bsStyle="success" 
                onClick={() => this.unlikeProposal(this.props.id)} >
                <i className="fa fa-thumbs-up" /> &nbsp;
                  {this.state.count}
              </Button>}
        
        </div>
      )
    } else {
      return (
        <div>
       
          <Button 
            disabled 
            variant="light"
            className="keyClaimFooterItem" 
            onClick={() => this.likeKeyClaim(this.props.id)} >
              <i className="fa fa-thumbs-up" /> &nbsp;
              {this.state.count}
          </Button>
        
        </div>
      )
    }

  }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(LikeButtonProposal);




