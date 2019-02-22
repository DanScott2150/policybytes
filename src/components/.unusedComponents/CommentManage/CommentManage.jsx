import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CommentManage extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <h1>Comment Manage</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})


export default connect(mapStateToProps)(CommentManage);
