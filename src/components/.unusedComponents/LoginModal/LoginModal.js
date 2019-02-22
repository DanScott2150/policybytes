import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../../redux/actions/loginActions';
import { Button, FormControl, FormGroup, Modal } from 'react-bootstrap'; 

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    if (this.props.registered) {
      this.setState({ open: true });
    }
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user);
    if (nextProps.user.userName) {
      this.props.history.push('/user');
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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
    return (<span />);
  }

  render() {
    return (
      <div>
        <Button bsSize="small" onClick={this.handleOpen}>
          Admin Sign in
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

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.login}>Login</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginModal);
