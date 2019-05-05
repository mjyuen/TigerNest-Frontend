import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios";
import Router from 'next/router';


class ReselectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
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
      url: 'https://tigernest-backend.herokuapp.com/visitor_pairing/filter_eligibilities/' + this.props.event_id + '/' + this.props.visitor_id, 
    })
    .then(resp => {
      this.setState({vp: resp.data})
      return axios({
        method: 'delete',
        url: 'https://tigernest-backend.herokuapp.com/visitor_pairing/delete/' + this.state.vp.visitor_pairing_id,
      })
    })
    .then(resp => {
      axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/pairing/removeVisitor/' + this.state.vp.pairing_id,
        headers: {'Authorization': 'Bearer '+localStorage.getItem("token")},
      })
    })
    .then(resp => {
      axios({
        method: 'post',
        url: 'https://tigernest-backend.herokuapp.com/eligibility/visitor_signup_not/' + this.props.eligibility_id,
      })
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
          <ModalHeader toggle={this.toggle}>Edit your room type selection for <strong>{this.props.event_name}</strong>?</ModalHeader>
          <ModalBody>
            You have already selected a room for this event. If you choose to proceed and look at available rooms, your current reservation <strong>will be deleted</strong> and you must go through room selection again. <br /> <br /> You can still select the same room type if you proceed (if it is available), after your current reservation is removed.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Proceed</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Keep My Room Type Choice</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ReselectModal;