import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import SignUpComponent from './components/SignUpComponent'
import SignInComponent from './components/SignInComponent'
import ProfileComponent from './components/ProfileComponent'
import NavbarComponent from './components/NavbarComponent'
import {LoggedProvider} from './components/LoggedContext'

function App() {

  return (
    <LoggedProvider>
      <div className="App">
        <Router>
            <NavbarComponent/>
          <Switch>
            <Route  exact path='/signup' component={SignUpComponent}/> 
            <Route  exact path='/signin' component={SignInComponent}/> 
            <Route  exact path='/profile' component={ProfileComponent}/> 
          </Switch>     
        </Router>
        
      </div>
    </LoggedProvider>
  );
}

export default App;
