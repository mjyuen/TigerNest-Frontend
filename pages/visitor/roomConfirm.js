import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from "axios";
import Router from 'next/router';
import ChangeModal from './changeModal';



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
      pairing: query.pairing,
      vp: query.vp
    }
  }

  handleSubmit=() => {
    axios({
        method: 'delete',
        url: 'https://tigernest-backend.herokuapp.com/visitor_pairing/delete/' + this.props.vp,
    })
    .then(resp => {
      axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/pairing/removeVisitor/' + this.props.pairing,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })
     })
     .then(resp => {
       axios({
         method: 'post',
         url: 'https://tigernest-backend.herokuapp.com/eligibility/visitor_signup_not/' + localStorage.getItem("eligibility")
       })
     })
    .then(resp => {
      Router.push("/visitor/roomSearch?event=" + this.props.event + "&id=" + localStorage.getItem("eligibility"))
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
      <ChangeModal vp={this.props.vp} event={this.props.event} pairing={this.props.pairing} event_name={this.state.eventInfo.name} />
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
