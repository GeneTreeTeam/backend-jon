import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {signUp }from './constants/auth'

class App extends Component {
   printMe(){
      signUp("jay", "email@gmail.com", "password");
  }

  render() {
    return (
      <div>
       <button type='button' onClick={this.printMe} >Sign Up</button>
      </div>
    );
  }
}

export default App;
