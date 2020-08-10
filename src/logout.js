import React, { Component } from 'react'
import {  Redirect } from 'react-router-dom';



class Logout extends Component {
  constructor(props){
    super(props)
      localStorage.removeItem("token")
    
  }
  
  render() {
  if(this.props.location.state.loggedIn){return <Redirect to= {{pathname: "/"}} />}

    return (
      <div>
      </div>
    )
}
}

export default Logout
