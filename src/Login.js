import React, { Component } from 'react'
import {  Redirect } from 'react-router-dom';
import { message } from 'antd';




class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      loggedIn:false,
      userone:'',
      data:'',
      counter:0,
      AdminIn:''
    
    }
  }
  componentDidMount(){
    fetch("http://localhost:3000/login").then((response) => {
      response.json().then((result) => {
        this.setState({ data: result })
        console.log(this.state.data)
     
      })
    })
  }



  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e) => {
    let addIn = true
    this.state.data.map((data)=>{
      if(data.username === this.state.username){
        addIn = false
        // debugger
        this.setState({counter:data.counter})
      
        console.log(this.state.counter)
      }
     
    })
 
    if(addIn){
      let user = {
        username  : this.state.username,
        password :this.state.password,
        counter :0
      }
      
    fetch("http://localhost:3000/login" ,{
      method:"Post",
      headers:
      {"Content-Type":"application/json"
  },
      body:JSON.stringify(user)

    }).then((Result)=>{
      Result.json().then((response)=>{
        console.log(response.counter)

        this.setState({
          counter:response.counter
        })
        console.log(this.state.counter)
        

     
        
      })

    })

    }
  

 
    console.log(this.state.loginID)

    const { username, password } = this.state;
    if (username && password) {
      localStorage.setItem("token", "89ihjbuigyuftyfuhbjh")
      this.setState({
        loggedIn: true
      })
    }
    console.log(this.state.loggedIn)
  }
  handleCheckAdmin   = ()=>{
    // e.preventdefault()
    fetch("http://localhost:3000/admin").then((response) => {
      response.json().then((result) => {
        console.log(result)
        if(this.state.username == result.username){
          this.setState({AdminIn:true})
          console.log(this.state.AdminIn)
        }
     
      })
    })

  }


  render() {
    if (this.state.loggedIn) {
      return <Redirect to= {{pathname: "/Home",  state: {username:this.state.username,counter : this.state.counter}}} />
      
    }
    if (this.state.AdminIn) {
      return <Redirect to= {{pathname: "/Home",  state: {username:this.state.username,AdminIn:this.state.AdminIn}}} />
    }
    return (
      <div >
    
        <h1 style={{ textAlign: "center" }}>Login </h1>
        <form onSubmit = {this.submitForm}  style={{ marginLeft: '40%', width: '20%' }}>
          <div className="form-group" onSubmit={this.submitForm}>
            <label htmlFor="exampleInputEmail1"> Username</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} />
          </div>
        

          <button type="submit" className="btn btn-primary">Submit</button> 

          {/* <span style = {{marginLeft:23,fontSize:23}}>OR</span> */}
   
         

        </form>
        <button  type="submit"   style = {{marginLeft:23}} onClick = {this.handleCheckAdmin}  className="btn btn-primary">Admin
           Panel</button>
      </div>
    )
  }
}
export default Login;
