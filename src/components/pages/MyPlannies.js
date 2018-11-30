import * as React from 'react';
import { connect } from 'react-redux';
import { plannyActionCreators } from '../../actions/actionCreators'
import { ApplicationState } from '../..';
import { MyPlannyTable } from '../organisms/MyPlannyTable'
import { Row, Col, Button } from 'react-bootstrap'
import { MyParticipation } from '../../model/MyParticipation';
import './MyPlannies.scss';

export class MyPlannies extends React.Component {

  constructor(props) {
    super(props);
    this.declineParticipation = this.declineParticipation.bind(this);
    this.approveParticipation = this.approveParticipation.bind(this);
    this.cancelPlanny = this.cancelPlanny.bind(this);
    this.deleteProposal = this.deleteProposal.bind(this);
  }

  createNew(){
    this.props.history.push("/createplanny");
  }

  declineParticipation(id) {
    this.props.declineParticipation(id);
  }

  approveParticipation(id) {
    this.props.approveParticipation(id);
  }

  componentDidMount() {
    this.props.getMyPlannies();
    this.props.getMyParticipations();
  }

  deleteProposal(id) {
    this.props.deleteProposal(id);
  }

  cancelPlanny(id) {
    this.props.cancelParticipation(id);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className="titleWrapper">
            <div className="title"> My Plannies </div>
          </div>

          <MyPlannyTable
            deleteProposal={this.deleteProposal}
            plannies={this.props.myPlanniesState.plannies}
            approveParticipation={this.approveParticipation}
            declineParticipation={this.declineParticipation} 
            createNew = {() => this.createNew()}/>      
        </Col>

        <Col xs={12}>
          <div className="titleWrapper">
            <div className="title"> My Participations</div>
          </div>

          <div className="myParticipationList">
            {this.props.myPlanniesState.participations.map((part) =>
              <div style={{'margin-bottom': '35px'}}>
                <div className="myParticipationBox">
                  <b>{part.plannyName}</b> - {part.state}
                  <Button
                    onClick={() => this.cancelPlanny(part.plannyId)}>
                    Cancel
                 </Button>
                </div>
              </div>
            )}
          </div>


        </Col>
      </Row>

    );
  }
}

export default connect(
  (state) => ({
    myPlanniesState: state.myPlanniesState,
  }),
  plannyActionCreators
)(MyPlannies);


