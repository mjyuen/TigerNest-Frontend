import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from "axios";


class RoomConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        eventInfo: {}
    }
  }
  static getInitialProps({query}) {
    return {
      event: query.event,
      pairing_id: query.pairing,
      vp: query.vp
    }
  }

  handleSubmit=() => {
    axios({
        method: 'delete',
        url: 'https://tigernest-backend.herokuapp.com/visitor_pairing/delete/' + this.props.vp,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")}, 
    })
    .then(resp => {
      axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/pairing/removeVisitor/' + this.props.pairing_id,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })
     })
    .then(resp => {
      Router.push("/visitor/roomSearch?event=" + this.state.room.event_id)
    })
  }

  componentDidMount() {
    console.log(this.props.event)
    console.log(this.props.pairing_id)
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/event/' + this.props.event,
    })
    .then(resp => {
      this.setState({eventInfo: resp.data});
      console.log(resp.data)
    })
  }

  render() {
    return (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <center> Your room type choice for <strong>{this.state.eventInfo.name}</strong> has been confirmed! </center>
      <div className="option">
      <Button href="/visitor/roomSearch" onClick={this.handleSubmit}>I would like to change my room type</Button>
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
}
}

export default RoomConfirm
