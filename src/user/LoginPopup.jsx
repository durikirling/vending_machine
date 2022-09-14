
import React, {Component} from 'react';

class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "admin",
      password: "pass",
      inputLogin: "",
      inputPassword: "",
    };
    
  };

  toOpenLogin = () => {
    // let array = Array.from(document.querySelectorAll('div[id="modalLogin"]'))
    // array[0].style.display = 'block'
    Array.from(document.querySelectorAll('div[id="modalLogin"]'))[0].style.display = 'block'
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitLogin = () => {
    if (this.state.login === this.state.inputLogin && this.state.password === this.state.inputPassword)
    {
      this.props.toLogin()
      this.exitLogin();
    }
  }

  exitLogin = () => {
    // let array = Array.from(document.querySelectorAll('div[id="modalLogin"]'))
    // array[0].style.display = 'none'
    Array.from(document.querySelectorAll('div[id="modalLogin"]'))[0].style.display = 'none'
    this.setState({
      inputLogin : "",
      inputPassword: ""
    });
  }

  EnterKeyPress = (e) => {
    if (e.key === "Enter") {
      this.submitLogin();
    }
  };

render() {
    return(
        <div>
            <div 
            className="login" 
            onClick={this.toOpenLogin}
            >
                Login
            </div>
            <div 
            id="modalLogin" 
            className="modal"
            >
                <div className="modal-content"><br/><br/>
                  Login 
                  <input 
                  name ="inputLogin"
                  value = {this.state.inputLogin}
                  onChange={this.handleInputChange} 
                  onKeyPress={this.EnterKeyPress}>
                  </input>
                  <div 
                  className="hint login-hint" 
                  data-title={this.state.login}
                  >
                    ?
                  </div><br/>
                  Password
                  <input 
                  name ="inputPassword"
                  type="password"
                  value = {this.state.inputPassword}
                  onChange={this.handleInputChange} 
                  onKeyPress={this.EnterKeyPress}>
                  </input>
                  <div 
                  className="hint login-hint" 
                  data-title={this.state.password}
                  >
                    ?
                  </div><br/>
                  <button onClick={this.submitLogin}>
                    OK
                  </button>
                  <div 
                  className="x" 
                  onClick={this.exitLogin}
                  >
                    &times;
                  </div>
             
  {/* <authentication mode="Forms">
    <forms  defaultUrl="/Home/Index" 
            loginUrl="Home/Login" 
            slidingExpiration="true" 
            timeout="20">
      <credentials passwordFormat="Clear" >
        <user name="Kees" password="pXZ4UsLu8A4V5d!"/>
        <user name="Erik" password="@z3eWVxBtrFNCHK"/>
      </credentials>
    </forms>
  </authentication> */}

                </div> 
            </div>
        </div>
      
      )
    };
};

export default LoginPopup;