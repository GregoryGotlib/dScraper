import React from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Home from './Components/Home';
import CustomNavbar from './Components/CustomNavbar';
import Dashboard from './Components/Dashboard';
import './App.css';
import Registration from './Components/Registration';
import DataVisualization from './Components/DataVisualization';
import Login from './Components/Login';
import SetAuth from './Utilities/SetAuth';
import jwt_decode from 'jwt-decode';
import store from './Store';
import { setDecodedUser } from './Actions/UserAction';
import PrivateRoute from './Utilities/PrivateRoute';
import { Provider } from 'react-redux';
import myStore from './Store';

if(localStorage.USER_TOKEN){
  SetAuth(localStorage.USER_TOKEN);

  //Decode token
  const decoded_token = jwt_decode(localStorage.USER_TOKEN);

  //Set decoded user
  store.dispatch(setDecodedUser(decoded_token));
}

 const App = () => {
    return (
      <Provider store={myStore}>
        <Router>
          <div className="App">
            <CustomNavbar/>
            <Route exact path="/" component={Home}/>
            <>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/registration" component={Registration}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/data" component={DataVisualization}/>
              </Switch>
            </>
          </div>
        </Router>
    </Provider>
    );
}

export default App;
