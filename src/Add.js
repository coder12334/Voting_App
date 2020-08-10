import React from 'react'
import { PageHeader } from 'antd';

import { Link } from 'react-router-dom'

class AddCandidate extends React.Component {
    constructor() {
        super();
        this.state = {
  
            partyName: null,
            candidate: null,
            Vote:0
            
        }
    }

    handleChange = (e) =>{
 this.setState({[e.target.name] : e.target.value })
   
    
        console.log(this.state)

    
    }

      handleSubmit = ()=> {
            fetch("http://localhost:3000/minsiter" ,{
          method:"Post",
          headers:
          {"Content-Type":"application/json"
      },
          body:JSON.stringify(this.state)

        }).then((Result)=>{
          Result.json().then((response)=>{
            console.warn(response)
          })

        })
        

  }


 render(){
   
 	return(<div>
     
     <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title={"go  back xd"}
    subTitle="Go For Vote"
  />

 		<form onSubmit = {this.handleSubmit } >


    <div className="form-group row">
    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">partyName</label>
    <div className="col-sm-5">
      <input type="text" className="form-control form-control-lg" id="colFormLabelLg" placeholder="partyName " name  = "partyName" value = {this.state.partyName} onChange = {this.handleChange}/>

    </div>

  </div>

     <div className="form-group row">
    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Candidate</label>
    <div className="col-sm-5">
    <input type="text" className="form-control form-control-lg" id="colFormLabelLg" placeholder="Candidatee name" name  = "candidate" value = {this.state.candidate} onChange = {this.handleChange}/>
    </div>
  </div>

  

  <button className="btn btn-primary" type="submit" >Add</button>
</form>
 		</div>)
 }
}
export default AddCandidate

