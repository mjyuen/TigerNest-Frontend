import React from 'react'
import Head from '../components/head'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { Button, Container, Row, Col, CustomInput, Form, FormFeedback, FormGroup, FormControl, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';


const database_url = "https://tigernest-backend.herokuapp.com"

var divStyle = {
  //color: 'slate grey'
  //color: 'dodgerblue'
  color: 'white'
};

class VisitorInterestForm extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      mismatchPassword: false,
      wrongRegCode: false,
      dropdownOpen: false,
      current_event: { 
        name:"",
        start_time:"",
        end_time:"",
        description:"",
        hosting_organization:"",
        expected_number_visitors:"",
        event_id:""
       }
    };
  
    this.addOrganizer = this.addOrganizer.bind(this)
    this.setSelectedEvent = this.setSelectedEvent.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }
  async setSelectedEvent(event)
  {
    let val = event.target.value;
    const res = await fetch(database_url + '/event/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
      }})
      var data = await res.json()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      this.setState(state => ({ current_event: data}));
  }
  async addOrganizer(){
  //console.log(document.forms["registerForm"]["netid"].value);

    let emailInput = document.forms["registerForm"]["email"].value;
    //let passwordInput1 = document.forms["registerForm"]["password1"].value;
    //let passwordInput2 = document.forms["registerForm"]["password2"].value;
    let firstnameInput = document.forms["registerForm"]["firstname"].value;
    let lastnameInput = document.forms["registerForm"]["lastname"].value;
    //let university = document.forms["registerForm"]["university"].value;
    //let event_name = document.forms["registerForm"]["eventname"].value;

    /*const res = await fetch('http://localhost:5000/visitor/' + emailInput, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
    */
    // add eligibility
    // add visitor

    // add email to visitor-add method
    //let registrationCode = document.forms["registerForm"]["regcode"].value;
    //let netid = document.forms["registerForm"]["netid"].value;
    //let netid = Cookies.get('netid');

    // need to add to eligibilities and
    //
    /*const res = await fetch("http://localhost:5000/getRegCode", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        }})
    var data = await res.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    let trueRegCode = data['regCode'];*/

    /*if (passwordInput1 !== passwordInput2)
    {
        this.setState(state => ({ mismatchPassword: true}));
    }*/
    
       let organizer_info = {
        "visitor_email": emailInput,
        "event_id": String(this.state.current_event.event_id),
        "event_name": String(this.state.current_event.name)
       };
       const res = await fetch('https://tigernest-backend.herokuapp.com/eligibility', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
       Router.push("/visitorConfirmation");

    }
    toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  static async getInitialProps(){
    const res = await fetch('https://tigernest-backend.herokuapp.com/event/sort_date', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res.json()
      data = JSON.stringify(data)

     data = JSON.parse(data)
     let events = [];

     for(let i = 0; i < data.length; i++)
     {
      events.push(data[i]);
     }

     return {
      events:events
     }
  }
  
  render(props){
    return (
  <div>
  <Head title="Event Signup" />
    <div className="hero">
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet" />

      <div className="center">

      <center> <h2 style={divStyle}> Event Interest Form </h2> </center>
      <br />
      <center> <p style={divStyle}> Fill out the following information to sign up for an event! </p> </center>
      <br />

       <Form id="registerForm">
       <center>
          <Row>
          <Col>
          <p style={divStyle}> First Name </p>
          </Col>
          <Col>
          <Input type="text" name="firstname" id="firstname"/>  
          </Col>
          </Row>
          <Row>
          <Col>
          <p style={divStyle}> Last Name  </p>
          </Col>
          <Col>
          <Input type="text" name="lastname" id="lastname"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col> 
          <p style={divStyle}> Which event will you be participating in? </p>
          </Col>
          <Col> 
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.current_event.name === "" ? <div> Select One </div> : <div> {this.state.current_event.name} </div>}
            </DropdownToggle>
            <DropdownMenu>
              {this.props.events.map((value, index) => {
                let jsonVal = value;
                return <DropdownItem key={index} value={jsonVal['event_id']} onClick={this.setSelectedEvent}> {jsonVal['name']} </DropdownItem>
              })}
            </DropdownMenu>
          </Dropdown>
          {/*<Input type="select" id="eventname" name="eventname">
              <option value="0">Select one</option>
              {this.props.events.map((value, index) => {
                let jsonVal = value;
                return <Button key=index value={jsonVal['event_id']} onClick={this.setSelectedEvent}> {jsonVal['name']} </Button>
              })}
          </Input> */}
          </Col>
          </Row>
          <Row>
          <Col>
          <p style={divStyle}> Email Address </p>
          </Col>
          <Col>
          <Input type="text" name="email" id="email"/>  
          </Col>
          </Row>
        
          <br />
          <center> <Button color="dark" onClick={this.addOrganizer}> Submit </Button> </center> </center>
          <br />
          {this.state.mismatchPassword ? <center> <p>Passwords do not match!</p> </center>: null}
          {this.state.wrongRegCode ? <center> <p>Wrong registration code! Please contact Niranjan Shankar (nshankar@princeton.edu) or Michelle Yuen (mjyeun@princeton.edu) for the correct registration code.</p> </center>: null}

        </Form>
        <br />
      </div>

    </div>
     <style jsx>{`
      :global(body) {
        margin: 0;
        //background: url("/static/candyBackground.jpg");
        background: url("/static/background.jpg");
        //backbround-color: #FFFFFF;
        //background-color: #1A9788;
        background-size: cover;
        font-family: 'Maven Pro', sans-serif;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style> 
  </div>)

}
}


export default VisitorInterestForm