import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from "axios";
import Router from 'next/router';
import ReselectModal from './reselectModal';


class EventSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      events:[]
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/visitor/data',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({user: resp.data});
      return  axios({
        method: 'get',
        url: 'https://tigernest-backend.herokuapp.com/eligibility/events_for_visitor/' + resp.data.email,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })  
    })    
    .then(resp => {
      console.log(resp.data)
      this.setState({events: resp.data});
    })
  }

  render() {
    return (
      <div>
      <Head title="Events List" />
        <Nav />
        
        <div className="hero">
          <center> Welcome <strong>{this.state.user.name} </strong> to the Select page! </center>
          <div className="option">
          <br />
          {
            this.state.events.length === 0 && "You are currently not signed up for any events. Please contact your event organizer if you believe this is a mistake."
          }
          <ButtonGroup vertical>
          {
            this.state.events.map(event => { 
              if (event.signed_up) {
                return (
                  <ReselectModal visitor_id={this.state.user.id} event_name={event.event_name} event_id={event.event_id} eligibility_id={event.eligibility_id}/>
                  )
              }
              return (<Button color="primary" onClick={() => Router.push("/visitor/roomSearch?event=" + event.event_id + "&id=" + event.eligibility_id)}>{event.event_name}</Button>
              )
            })
          }
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
  }
}

export default EventSelect
