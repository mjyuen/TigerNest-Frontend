import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'

const EventSelect =  () => (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <center> Welcome to the Select page! </center>
      <div className="option">
      <ButtonGroup vertical>
        <Button href="/visitor/roomSearchHackPrinceton">HackPrinceton</Button>
        <Button href="/vistor/roomSearchIvy">Ivy Council Conference</Button>
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
