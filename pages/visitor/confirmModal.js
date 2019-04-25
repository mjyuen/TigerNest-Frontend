import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios";

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      room: []
    }
   }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/pairing/' + this.props.pairing_id,
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
            <CardSubtitle><strong>Guest(s):</strong> 0/{this.state.room.max_visitors}</CardSubtitle>
            <CardText>Room: <strong style={{color:'pink'}}>♀ </strong></CardText>
            </CardBody>
          </Card>
            Would you like to proceed with this room?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" href="/visitor/roomConfirm">Proceed</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmModal;