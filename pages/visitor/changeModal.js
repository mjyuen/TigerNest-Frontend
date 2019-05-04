import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios";
import Router from 'next/router';


class ChangeModal extends React.Component {
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
       axios({
         method: 'post',
         url: 'https://tigernest-backend.herokuapp.com/eligibility/visitor_signup/' + localStorage.getItem("eligibility")
       })
       console.log("i hope this worked")
     })
    .then(resp => {
        Router.push("/visitor/roomSearch?event=" + this.props.event_id + "&id=" + this.props.eligibility_id)
    })
  }
  
  componentDidMount() {
  }


  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.event_name}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit your room type selection?</ModalHeader>
          <ModalBody>
            You have already selected a room for this event. If you choose to proceed and look at available rooms, your current reservation <strong>will be deleted</strong> and you must go through room selection again. You can still select the same room type if you proceed (if it is available), after your current reservation is removed.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Proceed</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Keep Current Room</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ChangeModal;