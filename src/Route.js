import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import Header from './Header';
import App from './App';
import Profile from './Profile';
import DemoAutoPlay from './Swipe';
import Game from './Game';
import MyAccount from './MyAccount';
import Contact from './Contact';
import Footer from './Footer';
import SignUp from "./auth/SignUp";
import LogOut from "./auth/LogOut";
import Send from "./Send";

class Routes extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Route>
            <Header />
          </Route>
          <div className='contents'>
            <Route exact path='/' component={App}/>
            <Route path='/Profile' component={Profile}/>
            <PrivateRoute path='/Game' component={Game}/>
            <PrivateRoute path='/Swipe' component={DemoAutoPlay}/>
            <PrivateRoute path='/MyAccount' component={MyAccount}/>
            <Route path='/Contact' component={Contact}/>
            <Route path='/Send' component={Send}/>
            <Route exact path="/signup" component={SignUp} />
            <Route path='/logout' component={LogOut}/>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    )
  }
};

export default Routes