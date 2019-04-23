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
      rooms: []
    }
  }

  static getInitialProps({query}) {
    return {
      event: query.event
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/pairing/hosts_for_event/2',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({rooms: resp.data});
    })
    
  }


render() {
  return (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <p>Showing room types available for <strong>{this.props.event}</strong> on April 13 - 14.</p>
      <div className="option">
      {
        this.state.rooms.map(room =>
          <Card style={{minWidth:'278px'}}>
          <CardBody>
            <CardTitle><strong>Host Gender:</strong> {room.host_gender}</CardTitle>
            <CardSubtitle><strong>Guest(s):</strong> 0/{room.max_visitors}</CardSubtitle>
            <CardText>Room: <strong style={{color:'pink'}}>♀ </strong></CardText>
            <Alert color="success" style={{padding:'.25rem .25rem'}}>
              10 rooms of this type available
            </Alert>
            <ConfirmModal pairing_id={room.pairing_id}/>
          </CardBody>
        </Card>
        )}
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

