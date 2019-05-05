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
      eventInfo: {},
      rooms: {},
      user: {}
    }
  }

  static getInitialProps({query}) {
    return {
      event: query.event,
      id: query.id
    };
  }

  componentDidMount() {
    if (process.browser) {
      localStorage.setItem("eligibility", this.props.id);
    }
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/event/' + this.props.event,
    })
    .then(resp => {
      this.setState({eventInfo: resp.data});
    })
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/visitor/data',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({user: resp.data});
      return axios({
        method: 'get',
        url: 'https://tigernest-backend.herokuapp.com/pairing/hosts_for_event/' + this.props.event,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })  
    })
    .then(resp => {
      var dict = {};
      console.log("help" + this.state.user.same_gender)
      resp.data.forEach((room) => {
        if (this.state.user.same_gender === true && (room.host_gender.toLowerCase() !== this.state.user.gender.toLowerCase())) {
          return;
        }
        if (room.same_gender_room === true && (room.host_gender.toLowerCase() !== this.state.user.gender.toLowerCase())) {
          return;
        }
        if (room.num_visitors === room.max_visitors) {
          return;
        }
        const key = room.num_visitors + room.host_gender.toLowerCase() + room.max_visitors
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
      <p>Showing room types available for <strong>{this.state.eventInfo.name}</strong> on <strong>{this.state.eventInfo.start_date} - {this.state.eventInfo.end_date}</strong>:</p>

      <div className="option">
      {
        Object.keys(this.state.rooms).map(key =>
          <Card style={{minWidth:'278px'}}>
          <CardBody>
            <CardTitle><strong>Host Gender:</strong> {key.replace(/[0-9]/g, '')}</CardTitle>
            <CardSubtitle><strong>Guest(s):</strong> {key.match(/\d+/g)[0]}/{key.match(/\d+/g)[1]}</CardSubtitle>
            <CardText></CardText>
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

