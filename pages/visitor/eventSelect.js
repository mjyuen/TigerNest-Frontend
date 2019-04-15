import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from "axios";

class EventSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
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
  }
}

export default EventSelect
