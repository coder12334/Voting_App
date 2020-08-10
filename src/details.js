import React, { Component } from 'react'
import { message } from 'antd';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import "./details.css"
import { PageHeader } from 'antd';


export default class details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      login: {},
      sucess:false,
      counter :''

    }

  }

  componentDidMount() {
  

    fetch("http://localhost:3000/minsiter/" + this.props.location.state.id).then((response) => {
      response.json().then((result) => {
        // console.log(result)
        this.setState({ data: result })
        console.log(this.props.location.state.username)
      })
    })
    fetch("http://localhost:3000/login/" ).then((response) => {
      response.json().then((result) => {
        console.log(result)
        this.setState({ login: result })
        console.log(this.state.login)
      })
    })

  }
  uploadFile = ()=> {

    var id  = 0
     let counter 
    var username = ''
    var password = ''
    fetch("http://localhost:3000/login/" ).then((response) => {
      response.json().then((result) => {
        // console.log(result)
        this.setState({ login: result })
        // console.log(this.state.login)
      })
    })

    this.state.login.map((login)=>{
      if(login.username === this.props.location.state.username){
        id = login.id
        counter = login.counter
        username = login.username
        password = login.password
        
      }
    })

   
    

    if (counter === 0) {
      let add = 0
      if(this.state.data.Vote === null){
        add = 0
      }
      add  =  this.state.data.Vote + 1
     
      console.log("vote",counter)

      let data = {
        id: this.state.data.id,
        partyName: this.state.data.partyName,
        candidate: this.state.data.candidate,
        Vote: add
      }
      fetch("http://localhost:3000/minsiter/" + this.props.location.state.id, {
        method: "PUT",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

      }).then((Result) => {
        Result.json().then((response) => {
          console.warn(response)
        })

      })
      
      let id  = 0
      this.state.login.map((login)=>{
        if(login.username === this.props.location.state.username){
          id = login.id
          console.log(id)
        }
      
       
      })
      let dataCount =
      {
        username: username,
        password: password,
        counter: 1,
        id: id
      }
      fetch("http://localhost:3000/login/" +id , {
        method: "PUT",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCount)

      }).then((Result) => {
        Result.json().then((response) => {
        console.warn(response)
        this.setState({counter:response.counter})
        if(response.counter === 1){  message.success("Thanks for Voting")}
  

        })

      })
      console.log(this.props.location.state.counter)


     

    }

  

  }
  render() {

// const {sucess} = this.state
console.log(this.props.location.state.counter)

    return (
      
      <div>
    
    <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title={this.props.location.state.partyName}
    subTitle="Go For Vote"
  />
  <div className="site-card-border-less-wrapper">
    <Card title={this.props.location.state.partyName} bordered={true} style={{ width: '100%' }}>
    <button type='primary' className="btn btn-primary"  data-toggle = "tooltip" data-placement = "top" title = "vote" disabled={this.props.location.state.counter === 1} onClick={this.uploadFile} >{"Vote For "+ this.props.location.state.partyName}</button>
    {this.props.location.state.partyName === 'bjp' && 
      <p>The Bharatiya Janata Party (pronounced [bʱaːrətiːjə dʒənətaː paːrʈiː] (About this soundlisten); translation: Indian People's Party; abbr. BJP) is the current ruling political party of the Republic of India.[37] It is one of the two major political parties in India, along with the Indian National Congress.[38] As of 2019, it is the country's largest political party in terms of representation in the national parliament and state assemblies and is the world's largest party in terms of primary membership.[39] BJP is a right-wing party, and its policy has historically reflected Hindu nationalist positions.[40][41] It has close ideological and organisational links to the much older Rashtriya Swayamsevak Sangh (RSS).[42]

The BJP's origin lies in the Bharatiya Jana Sangh,
 formed in 1951 by Syama Prasad Mukherjee.[43]
  After the State of Emergency in 1977, the Jana Sangh merged with several other parties to form the Janata Parvty; it defeated the incumbent Congress party in the 1977 general election. After three years in power, the Janata party 
  dissolved in 1980 with the members of the erstwhile Jana Sangh reconvening to form the
   BJP. Although initially unsuccessful, 
   winning only two seats in the 1984 general election, it grew in strength on the back of the Ram J
   anmabhoomi movement. Following victories in several state elections and better performances in 
   ational elections, the BJP became the largest party in the parliament in 1996; however, it l
   acked a majority in the lower house of Parliament, and its government lasted only 13 days.[44]</p>}
   {this.props.location.state.partyName === 'congress' && 
      <p>The Congress-led UPA has always considered the safety and security of each and every citizen of the country with paramount importance. The ten years of UPA rule saw a considerable increase in expenditure on national security and defence, with an increase from 77,000 crore in 2004-05 to 1,93,407 crore in 2012-13.</p>}
      {this.props.location.state.partyName === 'app' && 
           <p>Aam Aadmi Party (AAP, English: Common Man's Party) is an Indian political party, formally launched on 26 November 2012, and is currently the ruling party of the National Capital Territory of Delhi. It came into existence following differences between the activists Arvind Kejriwal and Anna Hazare regarding whether or not to politicise the popular India Against Corruption movement that had been demanding a Jan Lokpal Bill since 2011. Hazare preferred that the movement should remain politically unaligned while Kejriwal felt the failure of the agitation route necessitated a direct political involvement.</p>}

      </Card>
  </div>
 

      </div>
    )
  }
}
