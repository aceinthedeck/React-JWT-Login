import React, { Component } from 'react';

const API_URL = 'https://localhost:5001';

class App extends Component {

  state = {
    username:'',
    password:'',
    isError: false,
    message: '',
    isLoggedIn: false
  };

  login = (username, password) => {

    const requestOptions = {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify({username, password})
    };

    return fetch(`${API_URL}/api/auth/login`, requestOptions)
            .then((response) => {
              if(!response.ok) {
                if(response.status === 401){
                  throw Error("Unable to login please check username and password");
                }
                else {
                  throw Error("Error: "+response.statusText)
                }
                
              }
              else {
                response.json().then( response => {
                  this.setState({
                    isLoggedIn:true,
                    isError: false,
                    message: 'logged in!!',
                    username:'',
                    password:''
                  });
                  localStorage.setItem('token',response.token);
                });
              }
            })
            .catch(error => {
              this.setState({
                message: error.message,
                isError: true
              });
            });

  }

  handleSubmit = (e) => {

    this.setState({
      isLoggedIn: false
    })

    const {username, password} = this.state;
    e.preventDefault();
    if(username && password) {
      this.login(username, password);
    }

  }

  handleChange = (e) => {

    const {name, value} = e.target;
    this.setState({[name]: value});

  }

  render() {
    return (
      <div>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
                React JWT Login
            </h1>
          </div>
        </div>
      </section>
      <section className="section">
            <div className="container">
            {this.state.isLoggedIn && this.state.message &&
                <div className="notification is-primary">
                {this.state.message}
            </div>
            }
            {this.state.isError && this.state.message &&
                <div className="notification is-danger">
                {this.state.message}
            </div>
            }
                <h2 className="subtitle">
                   Login into your account
                </h2>
                <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="username" 
                        name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="input" type="password" placeholder="Password"
                        name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <button className="button is-primary">Login</button>
              </form>
            </div>   
        </section>
        
      </div>
    );
  }
}

export default App;
