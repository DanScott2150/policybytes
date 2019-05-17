import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap'; 

class TopicManagePanel extends Component {

  render() {

    return (

      <Link to='/topicEdit'>
      <Button variant="success" size="lg" block>
            Add New Topic <i class="fa fa-plus-square-o" aria-hidden="true"></i>
          </Button>
      </Link>

      // <Card className="w-75">
      // <Container>
      //   <Row>
      //     <Col>
      //   Create New Topic
      //     </Col>
      //     <Col>
      //                       
          
      //     </Col>
      //   </Row>
      //   </Container>
      // </Card>


      // <div>
      //       <Col xs={12} sm={6} md={4} lg={4}>
            
      //         <Card className="topicManageCard">
      //           <Card.Header className="topicManageCardHeading">
      //             Create a New Topic
      //           </Card.Header>
      //           <Card.Body>
      //           <Col xs={12} sm={12} md={12} lg={12}>
      //           </Col>
      //           </Card.Body>
      //         </Card>
      //       </Col>

            
      // </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(TopicManagePanel);
