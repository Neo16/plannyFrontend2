import * as React from 'react';
import { connect } from 'react-redux';
import { plannyActionCreators } from '../../actions/actionCreators'
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'react-bootstrap';
import { Planny } from '../../model/Planny';
import moment from 'moment';
import './Details.scss';

export class PlannyDetails extends React.Component {

  plannyId;

  constructor(props) {
    super(props)
    this.joinPlanny = this.joinPlanny.bind(this);
    this.cancelPlanny = this.cancelPlanny.bind(this);
  }

  joinPlanny() {
    this.props.joinPlanny(this.plannyId);
  }

  cancelPlanny() {
    this.props.cancelParticipation(this.plannyId);
  }

  componentDidMount() {

    this.plannyId = parseInt(this.props.match.params.id);
    this.props.getPlanny(this.plannyId);
  }

  render() {
    var p  = this.props.state.plannyDetail;
    console.log(p);
    return (
      <Row>
        <Col md={6} mdOffset={3} className="basicForm">
          <div className="titleWrapper">
            <div className="title">{p.name}</div>
          </div>

          <div>
            <img className="plannyDetailsImg" src={"https://edemstorage.blob.core.windows.net/pictures-container/"
              + p.pictureName} />
          </div>

          <div className="categoryCont">
            <div className="categoryTag">
              {p.categoryNames != undefined && p.categoryNames[0]}
            </div>
          </div>

          <div className="plannyTime">
            <b>
            {moment(p.fromTime).format('YYYY.MM.DD hh:mm')}-
             {moment(p.toTime).format('YYYY.MM.DD hh:mm')}
            </b>
          </div>

          <div className="plannyDescription">{p.description}</div>

          <div className="plannyInfo"><b>Location:</b> {p.location != undefined && p.location.address} </div>

          <div className="plannyInfo"><b>Max number of participants:</b> {p.maxParticipants} </div>

          <div className="plannyInfo"><b>Participants age:</b> {p.minAge} - {p.maxAge} </div>

          <div className="plannyInfo"><b>Participants gender: </b>doesn't matter</div>

          {p.participationState == "none" &&
            <Button
              className="joinButton"
              bsStyle="primary"
              onClick={this.joinPlanny}>
              Join planny
           </Button>}

          {p.participationState == "Required" &&
            <Button
              className="joinButton"
              onClick={this.cancelPlanny}>
              Cancel join request
           </Button>}

          {p.participationState == "Approved" &&
            <Button
              className="joinButton"
              bsStyle="success"
              onClick={this.cancelPlanny}>
              Cancel participation
           </Button>}

        </Col>
      </Row>
    );
  }
}

export default connect(
  (statee) => ({
    state: state.acquirePlanniesState
  }),
  plannyActionCreators
)(PlannyDetails); 