import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import ConfirmModal from './confirmModal';
import { Alert } from 'reactstrap';
import axios from "axios";


class RoomSearch  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomA: [],
      roomB: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/pairing/hosts_for_event/2',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({roomA: resp.data[0], roomB: resp.data[1]});
      console.log(resp.data)
    })
    
  }


render() {
  return (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <p>Showing room types available for <strong>HackPrinceton</strong> on April 13 - 14.</p>
      <div className="option">
      <Card style={{minWidth:'278px'}}>
        <CardBody>
          <CardTitle><strong>Host Gender:</strong> {this.state.roomA.host_gender}</CardTitle>
          <CardSubtitle><strong>Guest(s):</strong> 0/{this.state.roomA.max_visitors}</CardSubtitle>
          <CardText>Room: <strong style={{color:'pink'}}>♀ </strong></CardText>
          <Alert color="success" style={{padding:'.25rem .25rem'}}>
            10 rooms of this type available
          </Alert>
          <ConfirmModal pairing_id={this.state.roomA.pairing_id}/>
        </CardBody>
      </Card>
      <Card style={{minWidth:'278px'}}>
        <CardBody>
          <CardTitle><strong>Host Gender:</strong> {this.state.roomB.host_gender}</CardTitle>
            <CardSubtitle><strong>Guest(s):</strong> 0/{this.state.roomB.max_visitors}</CardSubtitle>
            <CardText>Room: <strong style={{color:'blue'}}>♂  </strong></CardText>
            <Alert color="success" style={{padding:'.25rem .25rem'}}>
              2 rooms of this type available
            </Alert>
            <ConfirmModal pairing_id={this.state.roomA.pairing_id}/>
        </CardBody>
      </Card>
      </div>

    </div>
<style jsx>{`
      .hero {
        width: 100%;
        color: white;
      }
      .option {
        color: grey;
        margin-left: 12.5%;
        justify-content: center;
        display: flex;
        width: 75%
      }
    `}</style>
  </div>
  )
    }
  }

export default RoomSearch

