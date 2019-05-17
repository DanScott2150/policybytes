import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, FormControl, FormGroup, Card } from 'react-bootstrap'; 

import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../../redux/actions/loginActions';
import './LoginPage.css'; 


const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
        };
      }
    
      componentWillMount() {
        // if (this.props.registered) {
        //   this.setState({ open: true });
        // }
      }
    
      componentDidMount() {
        this.props.dispatch(clearError());
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.user.userInfo) {
            console.log('got a user!');
          this.props.history.push('admin');
        }
      }

      
    
      login = (event) => {
        event.preventDefault();
    
        if (this.state.username === '' || this.state.password === '') {
          this.props.dispatch(formError());
        } else {
          this.props.dispatch(triggerLogin(this.state.username, this.state.password));
        }
      }
    
      handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    
    
      renderAlert() {
        if (this.props.login.message !== '') {
          return (
            <p
              className="alert"
              role="alert"
            >
              { this.props.login.message }
            </p>
          );
        }
        return (<p>Admin Login</p>);
      }

    render() {
        return (
          <div>
            <Card className="loginPanel">
                <Card.Header>
                {this.renderAlert()}
                </Card.Header>
                <Card.Body>
                <form>
                    <FormGroup
                        controlId=""
                    >
                        <FormControl
                            type="text"
                            placeholder="Enter your user name"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                        />
                        <FormControl
                            type="text"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputChangeFor('password')}
                        />
                    </FormGroup>
                </form>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={this.login}>Login</Button>
                </Card.Footer>
            </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LoginPage);