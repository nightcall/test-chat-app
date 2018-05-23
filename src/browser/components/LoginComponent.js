import React from 'react';
import { connect } from 'react-redux';
import { login } from './../actions/index';
import './LoginComponent.scss';
import loading from './img/loading.png';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: '',
      signUpForm: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      loginForm: {
        username: '',
        password: ''
      }
    };
  }

  handleFormChange = (form) => (e) => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [form]: {...prevState[form], [name]: value}
      };
    });
  }

  signUp = (e) => {
    e.preventDefault();

    const {
      username,
      password,
      repeatPassword
    } = this.state.signUpForm;

    // sign up tests
    if(!username.length || !password.length || password != repeatPassword) {
      console.log('Invalid signup form');
      return;
    }

    // api call
    fetch('/signup', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(
      data => data.json(),
      error => console.log('An error occured', error)
    ).then(data => {
      if(data.error)
        this.setState({info: `${username} is already taken.`});
      else
        this.setState({info: `Account created successfully !`});
    });
  }

  submitLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state.loginForm;
    const { handleLogin } = this.props;

    // tests
    handleLogin(username, password);
  }

  render() {
    const loginForm = this.state.loginForm;
    const signUpForm = this.state.signUpForm;
    const { isLoggingIn } = this.props;
    const { info } = this.state;

    if(isLoggingIn) {
      return (
        <div id='login-container'>
          <div>
            <img src={loading} alt='loading' />
          </div>
        </div>
      );
    } else {
      return(
        <div id='login-container'>
          <div>
            <div>
              <form onSubmit={this.signUp} >
                <input name='username' type='text' placeholder='Your username'
                  value={signUpForm.username} onChange={this.handleFormChange('signUpForm')} /><br />
                <input name='password' type='password' placeholder='Your password'
                  value={signUpForm.password} onChange={this.handleFormChange('signUpForm')} /><br />
                <input name='repeatPassword' type='password' placeholder='Repeat your password'
                  value={signUpForm.repeatPassword} onChange={this.handleFormChange('signUpForm')} /><br />
                <button>Sign up</button>
                <p>{info}</p>
              </form>
            </div>
            <div>
              <form onSubmit={this.submitLogin} >
                <input name='username' type='text' placeholder='Username'
                  value={loginForm.username} onChange={this.handleFormChange('loginForm')} /><br />
                <input name='password' type='password' placeholder='Password'
                  value={loginForm.password} onChange={this.handleFormChange('loginForm')} /><br />
                <button>Connect</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (username, password) => dispatch(login(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);