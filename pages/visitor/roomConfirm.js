import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'

const EventSelect =  () => (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <center> Confirmed </center>
      <div className="option">
      <Button href="/visitor/roomSearchHackPrinceton">I would like to change my room type</Button>
      <Button href="/visitor/eventSelect">I would like to register for a different event</Button>

      </div>
    </div>
<style jsx>{`
      .hero {
        width: 100%;
        color: white;
      }
      .option {
        justify-content: center;
        display: flex;
      }
    `}</style>
  </div>

)

export default EventSelect
