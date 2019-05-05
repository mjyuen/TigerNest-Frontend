import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import { Button } from 'reactstrap';
import Router from 'next/router';



var divStyle = {
  color: 'white'
  //color: 'dodgerblue'
};

var divStyle2 = {
  //color: 'white'
  color: 'dodgerblue'
};

var divStyle3 = {
  color: 'black'
}




const Home = () => (
  <div>

    <Head title="Home" />
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet" />
 
 
    <div className="hero">
      <h1 className="title" style={divStyle}>WELCOME TO <br /> TIGERNEST!</h1>
      <p className="description" style={divStyle}>
      <br />
        Matching Princeton students with visiting guests
      </p>
      <br />
      <center style={divStyle}> I am a.... </center>
      <div className="row">

      {/* <Card className="text-white" color="dark">
        <h5> Event Organizer </h5>
        <p> Register events that <br /> and visitors sign up for!</p>
          <center> <Link href="/myEvents">
            <a className="button">
              Login
            </a>
          </Link> </center>
          <center> <Link href="/eventOrganizerRegister">
            <a className="button">
              Sign up
            </a>
          </Link> </center>
      </Card> */}

          <a className="card">
            <h3 style={divStyle3}> Event Organizer</h3>
            <p style={divStyle3}> Register events that hosts and visitors sign up for!</p>
            <Button style={{marginTop: '29px'}} color="secondary" onClick={() => Router.push("https://tiger-nest2.herokuapp.com/myEvents")}>Login with CAS</Button>

          </a>
          <a className="card">
            <h3 style={divStyle3}>Host 🛏️</h3>
            <p style={divStyle3}>Host a visiting student!</p>
            <Button style={{marginTop: '48px'}} color="secondary" onClick={() => Router.push("https://tiger-nest2.herokuapp.com/hostAllEvents")}>Login with CAS</Button>
          </a>
          <a className="card">
            <h3 style={divStyle3}>Visitor 💼</h3>
            <p style={divStyle3}>
              Find a place to stay!
              </p>
              <Button color="secondary" onClick={() => Router.push("/visitor/login")}>Login</Button>
              <Button style={{marginTop: '10px'}} color="secondary" onClick={() => Router.push("/visitor/register")}>Register</Button>
          </a>
    </div>
    </div>

    <style jsx>{`
      :global(body) {
        margin: 0;
        background: url("/static/background.jpg");
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
  </div>
)

export default Home