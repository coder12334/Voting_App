import React from 'react'
import { Alert } from 'antd';
import { message } from 'antd';

import { Link } from 'react-router-dom'
import { Progress } from 'antd';
import { Tag } from 'antd';
import {
  SyncOutlined
} from '@ant-design/icons';


class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.onDelete = this.onDelete.bind(this)


    const token = localStorage.getItem("token")
    // console.log(token)
    var loggedIn = true
    if (token === null) {
      loggedIn = false
    }
    this.state = {
      loggedIn
    }
    this.setState({ loggedIn })

    console.log(this.state.loggedIn)
  }
  componentDidMount() {
    fetch("http://localhost:3000/minsiter").then((response) => {
      response.json().then((result) => {
        // console.log(result)
        this.setState({ data: result })
        // console.log(this.state.data)
      })
    })


  }
  onDelete(id, partyName) {
    fetch("http://localhost:3000/minsiter/" + id,
      {
        method: 'DELETE',

      }).then((result) => {
        result.json().then((response) => {
          console.warn(response)
        })
      })
    message.success(partyName + "has been removed from Election ",)

    window.location.reload(false);
  }




  render() {

    let Total = 0
    let obj = []

    let max =0
    let result = (this.state.data) && (this.state.data.map((data) => {
      return (<div>
        Total = Total + data.Vote

        {max<data.Vote && (max=data.Vote) && (obj = data)}
      </div>)
    }))
    console.log(max)
    let resultElec = obj.candidate

    return (<div>
      <div style = {{    height: 96}} class="shadow p-3 mb-5 bg-white rounded">
        <h1><p class="text-primary text-monospace">We Welcome {this.props.location.state.username}</p></h1>




        {this.props.location.state.AdminIn &&
      
      <Link to={{ pathname: "/create" }}><button  type="button" className=" btn btn-primary">
        ADD</button></Link>  }

          <Link to={{ pathname: "/logout", state: { loggedIn: this.state.loggedIn } }}> <button style={{
      borderRadius: 25,
      float: "right",
      marginTop: "-73px",
      marginRight: "27%"
  
    }} type="button" className=" btn btn-outline-primary">
      Logout</button></Link> 
        


      </div>


      <section style={{ padding: "10px 0px", display: "list-item" }}>

        <div className="row no-gutters" >

          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/voter/voter-services/"  >
              <img src="https://eci.gov.in/img/voter-services-icon.png" className="img-fluid" alt="Voter Services" />
            </a>
          </div>



          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/voter/voter-education/" >
              <img src="https://eci.gov.in/img/voter-education-icon.png" className="img-fluid" alt="Voter Education" />
            </a>
          </div>
          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/elections/election/" >
              <img src="https://eci.gov.in/img/election-icon.png" className="img-fluid" alt="Elections" />
            </a>
          </div>
          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/candidate-political-parties/candidate-politicalparties/" >
              <img src="https://eci.gov.in/img/political-party-icon.png" alt="Candidate-Political party" />
            </a>
          </div>

          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/media-publication/media-publication/" >
              <img src="https://eci.gov.in/img/publication-icon.png" alt="Publications" />
            </a>
          </div>



          <div className="col-lg-2 col-sm-6 hover-img">
            <a href="/divisions-of-eci/ict-apps/">
              <img src="https://eci.gov.in/img/ict-apps-icon.png" alt="ICT APPS" />
            </a>
          </div>





        </div>

      </section>






      <div className="container">
        <Alert style={{ marginBottom: 20 }}
          message="Live Result"
          description={resultElec + "  is winning the election"}
          type="info"
          showIcon
        />

        {this.state.data ?
          <div style={{ display: 'flex', flexWrap: 'wrap',marginLeft: 92 }}>
            {this.state.data.map((data, i) => {

              return (
                <div key={data.id} className="card" style={{
                  marginLeft: 10, marginBottom: 10, borderBottom: "6px solid blue",
                  width: "18rem"
                }}>

                  {data.partyName === 'bjp' ? (<img src="https://static.toiimg.com/photo/56661289.cms" style={{ height: 163 }} className="card-img-top" alt="..." />) : ''}
                  {data.partyName === 'congress' ? (<img src="https://www.deccanherald.com/sites/dh/files/articleimages/2020/07/30/Congress-1596102744.jpg" style={{ height: 163 }} className="card-img-top" alt="..." />) : ''}
                  {data.partyName === 'app' ? (<img src="https://m.economictimes.com/thumb/msid-72415701,width-1200,height-900,resizemode-4,imgsize-94513/aap-agencies.jpg" style={{ height: 163 }} className="card-img-top" alt="..." />) : ''}

                  <div className="card-body">
                    <h5 className="card-title">{data.partyName}</h5>
                    <p className="card-text">{data.candidate}</p>




                    <Link to={{ pathname: "/details", state: { id: data.id, partyName: data.partyName, username: this.props.location.state.username, counter: this.props.location.state.counter } }}><button type="button" className="btn btn-primary">Go For Vote</button></Link>

                    {this.props.location.state.AdminIn ? <button type="button" onClick={(id, partyName) => this.onDelete(data.id, data.partyName)} className="btn btn-primary">Remove</button> : " "}
                  </div>
                </div>)
            })}

          </div> : ""

        }
      </div>
    </div>)
  }
}

export default Navbar