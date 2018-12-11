import * as React from 'react';
import { connect } from 'react-redux';
import { publicPlannyAsyncActionCreators } from '../../actions/asyncActionCreators/publicPlannyAsyncActionCreators';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';
import './Details.css';
import { Link } from 'react-router-dom';

export class PlannyDetails extends React.Component {

  plannyId;

  joinPlanny = () => {
    this.props.joinPlannyAsync(this.plannyId);
  }

  cancelPlanny = () => {
    this.props.cancelParticipationAsync(this.plannyId);
  }

  componentDidMount() {
    this.plannyId = parseInt(this.props.match.params.id);
    this.props.getPlannyAsync(this.plannyId);
  }

  render() {
    let p = this.props.publicPlanniesState.plannyDetail;
    if (p == undefined) {
      return (<p></p>);
    }
    else {
      return (
        <Row>
          <Col md={{ size: 8, offset: 2 }} className="details-cont mt-3">

            <div className="plannyTitle">{p.name}</div>

            <div className="plannyDetailsImg-wrapper">
              <img className="plannyDetailsImg" src={p.pictureUrl} />
            </div>

            <div className="details-cont-body">
              <div className="categoryCont">
                {p.categories != undefined && p.categories.map(c => (
                  <div className="categoryTag">
                    {c.name}
                  </div>
                ))}
              </div>

              <div className="plannyTime">
                <b>
                  {moment(p.fromTime).format('YYYY.MM.DD hh:mm')}-
                   {moment(p.toTime).format('YYYY.MM.DD hh:mm')}
                </b>
              </div>

              <div className="plannyDescription">{p.description}</div>

              <div className="plannyInfo"><b>Location:</b> {p.location != undefined && p.location.address} </div>

              <div className="plannyInfo">
                <b>Hosted by:</b> <Link to={'/profiles/' + p.ownerId}>{p.ownerName}</Link>
              </div>

              <div className="plannyInfo"><b>Max number of participants:</b> {p.maxParticipants} </div>

              <div className="plannyInfo"><b>Participants age:</b> {p.minAge} - {p.maxAge} </div>

              <div className="plannyInfo"><b>Participants gender: </b>doesn't matter</div>

              {this.props.publicPlanniesState.plannyDetail.joinStatus == '1' &&
                <Button
                  className="joinButton"
                  color="info" outline
                  onClick={this.joinPlanny}>
                  Join planny
              </Button>}
              {this.props.publicPlanniesState.plannyDetail.joinStatus == '2' &&
                <Button
                  outline
                  className="joinButton"
                  onClick={this.cancelPlanny}>
                  Cancel join request
              </Button>}
              {this.props.publicPlanniesState.plannyDetail.joinStatus == '3' &&
                <Button
                  className="joinButton"
                  outline
                  color="danger"
                  onClick={this.cancelPlanny}>
                  Cancel participation
              </Button>}
            </div>
          </Col>
        </Row>
      );
    }
  }
}

export default connect(
  (state) => ({
    publicPlanniesState: state.publicPlanniesState
  }),
  dispatch => ({
    ...publicPlannyAsyncActionCreators(dispatch)
  })
)(PlannyDetails); 