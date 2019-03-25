import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap'

const EventSelect =  () => (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <p>Showing room types available for <strong>Ivy Council Conference</strong> on May 13 - 14.</p>
      <div className="option">
      <ButtonGroup vertical>
        <Button href="/visitor/roomSearch">HackPrinceton</Button>
        <Button href="/vistor/roomSearch">Ivy Council Conference</Button>
      </ButtonGroup>
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
