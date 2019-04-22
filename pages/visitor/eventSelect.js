import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from "axios";
import Router from 'next/router';

class EventSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      elig:[]
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/visitor/data',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({user: resp.data});
      console.log(localStorage.getItem("token"))
    })
    
    axios({
      method: 'get',
      url: 'http://localhost:5000/eligibility/events_for_visitor/24',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({elig: resp.data[0]});
      console.log(JSON.stringify(resp.data[0]))
    })
  }

  render() {
    return (
      <div>
      <Head title="Events List" />
        <Nav />
        
        <div className="hero">
          <center> Welcome <strong>{this.state.user.name}</strong> to the Select page! </center>
          <div className="option">
          <ButtonGroup vertical>
            <Button onClick={() => Router.push("/visitor/roomSearchHackPrinceton")}>{this.state.elig.event_name}</Button>
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
