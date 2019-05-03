import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios";
import Router from 'next/router';


class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      room: [],
      user: {},
      vp: {}
    }
   }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  handleSubmit=() => {
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/visitor/data',
      headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
    })
    .then(resp => {
      this.setState({user: resp.data});
      console.log(this.props.pairing_id)
      return  axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/visitor_pairing',
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
        data: {
          visitor_id: resp.data.id,
          visitor_email: resp.data.email,
          event_id: this.state.room.event_id,
          pairing_id: this.props.pairing_id
        }
      })  
    })
    .then(resp => {
      this.setState({vp: resp.data})
      axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/pairing/addVisitor/' + this.props.pairing_id,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })
     })
    .then(resp => {
      Router.push("/visitor/roomConfirm?event=" + this.state.room.event_id + "&pairing=" + this.props.pairing_id + "&vp+" + this.state.vp.visitor_pairing_id)
    })
  }
  
  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://tigernest-backend.herokuapp.com/pairing/' + this.props.pairing_id,
    })
    .then(resp => {
      this.setState({room: resp.data});
      console.log(resp.data)
    })
    
  }


  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Select this Room</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>You have selected:</ModalHeader>
          <ModalBody>
          <Card>
            <CardBody>
            <CardTitle><strong>Host Gender:</strong> {this.state.room.host_gender}</CardTitle>
            <CardSubtitle><strong>Guest(s):</strong> {this.state.room.num_visitors}/{this.state.room.max_visitors}</CardSubtitle>
            <CardText></CardText>
            </CardBody>
          </Card>
            Would you like to proceed with this room type?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Proceed</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmModal;