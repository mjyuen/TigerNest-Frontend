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
      event: query.event
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/event/' + this.props.event,
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
      <Button href="/visitor/roomSearch">I would like to change my room type</Button>
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
