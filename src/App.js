import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Navbar from './home'
import Logout from './logout'
import details from './details.js'
import AddCandidate from './Add'
import Vote from './vote';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div  className="App">
            
        
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/Home" component={Navbar}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/details" component={details}/>
                    <Route path="/create" component={AddCandidate}/>
                    <Route path="/vote" component={Vote}/>
                 

                  </Switch>
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;
