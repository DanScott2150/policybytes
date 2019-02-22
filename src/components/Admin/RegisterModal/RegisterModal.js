import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Modal } from 'react-bootstrap';

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      open: false,
      registered: false
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const request = new Request('api/user/register', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            // this.props.history.push('/home');
            this.setState({
              message: 'Success! Write down your new username and password, then close.',
              registered: true
            }, () => {
              // let millisecondsToWait = 1000;
              // setTimeout( () => {
              //   this.handleClose();
              // }, millisecondsToWait);
            });

          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleOpen = () => {
    this.setState({ 
      open: true,
      registered: false
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <p
          className="alert"
          role="alert"
        >
          {this.state.message}
        </p>
      );
    }
    return (<span />);
  }

  render() {

    return (
      <div>
        <Button bsSize="small" onClick={this.handleOpen}>
          Register a New Admin
        </Button>

        <Modal show={this.state.open} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.renderAlert()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId=""
              >
                <FormControl
                  type="text"
                  placeholder="Enter a new user name"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
                <FormControl
                  type="text"
                  placeholder="Enter a valid password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </FormGroup>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            {!this.state.registered ? <Button onClick={this.registerUser}>Register</Button> : <Button onClick={this.registerUser}>Register Another User</Button>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;

