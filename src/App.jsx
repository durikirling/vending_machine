import React, { Component } from 'react';
import './App.css';
import VendingMachine from './components/VendingMachine';

class App extends Component {
  // constructor(props) {
  //   super(props);

  render() {
    return (
      <div className="App">
        {/* для подключения шрифта */}
        <link
          href='https://fonts.googleapis.com/css?family=Orbitron'
          rel='stylesheet'
          type='text/css'
        />
        <VendingMachine />
      </div>
    )
  };
};

export default App;

// import { Router } from 'react-router';
// import { Redirect, Route, Switch } from 'react-router-dom';

// import ScreensUserForm from './User/Form';
// import ScreensUserList from './User/List';

// const ScreensRoot = () => (
//   <Router>
//     <Switch>
//       <Route path="/user/list" component={ScreensUserList} />
//       <Route path="/user/create" component={ScreensUserForm} />
//       <Route path="/user/:id" component={ScreensUserForm} />
//     </Switch>
//   </Router>
// );