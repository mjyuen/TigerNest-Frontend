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
      rooms: {}
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
      var dict = {};
      resp.data.forEach(function(room) {
        const key = room.host_gender.toLowerCase() + room.max_visitors

        if (!dict[key]) {
          dict[key] = new Array();
          dict[key].push(room.pairing_id)
        }
        else {
          dict[key].push(room.pairing_id);
        }
      });
      this.setState({rooms: dict});
    })
    
  }


render() {
  console.log(this.state.rooms);
  return (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <p>Showing room types available for <strong>{this.props.event}</strong> on April 13 - 14.</p>
      <div className="option">
      {
        Object.keys(this.state.rooms).map(key =>
          <Card style={{minWidth:'278px'}}>
          <CardBody>
            <CardTitle><strong>Host Gender:</strong> {key.replace(/[0-9]/g, '')}</CardTitle>
            <CardSubtitle><strong>Guest(s):</strong> 0/{key.replace(/\D/g, "")}</CardSubtitle>
            <CardText>Room: <strong style={{color:'pink'}}>♀ </strong></CardText>
            <Alert color="success" style={{padding:'.25rem .25rem'}}>
              {this.state.rooms[key].length} room(s) of this type available
            </Alert>
            <ConfirmModal pairing_id={this.state.rooms[key][0]}/>
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

