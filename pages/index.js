import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import Router from 'next/router';
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

const responseGoogle = (response) => {
  console.log(response);
}

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to TigerNest!</h1>
      <p className="description">
        Matching Princeton students with visiting students.
      </p>

      <div className="row">
          <a className="card">
            <h3>Hosts 🛏️</h3>
            <p>Host a visiting student!</p>
          </a>
          <a className="card">
            <h3>Visitors 💼</h3>
            <p>
              Find a place to stay!
            </p>
              <Button color="secondary" onClick={() => Router.push("/visitor/login")}>Login</Button>
              <Button style={{marginTop: '10px'}} color="secondary" onClick={() => Router.push("/visitor/register")}>Register</Button>

          </a>
        
      </div>
      
      <p className="description">
        Organizing an event and need hosts? Click here to login with CAS
      </p>

    </div>

    <style jsx>{`
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