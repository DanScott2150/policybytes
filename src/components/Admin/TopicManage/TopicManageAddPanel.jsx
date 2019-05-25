// Button to 'Add New Topic' on Admin Page

// Does this really need to be split out into its own file?

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

class TopicManagePanel extends Component {

  render() {
    return (
      <Link to='/topicEdit'>
        <Button variant="success" size="lg" block>
          Add New Topic <i className="fa fa-plus-square-o" aria-hidden="true"></i>
        </Button>
      </Link>
    )
  }
}

export default TopicManagePanel;
