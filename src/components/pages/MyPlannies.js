import * as React from 'react';
import { connect } from 'react-redux';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import {commonAsyncActionCreators} from '../../actions/asyncActionCreators/commonAsyncActionCreators';
import { ApplicationState } from '../..';
import { MyPlannyTable } from '../organisms/MyPlannyTable';
import { Row, Col, Button } from 'reactstrap';
import If from '../atoms/If';
import './MyPlannies.css';
import { push } from 'connected-react-router';

export class MyPlannies extends React.Component {

  constructor(props) {
    super(props);
    this.declineParticipation = this.declineParticipation.bind(this);
    this.approveParticipation = this.approveParticipation.bind(this);
    this.cancelPlanny = this.cancelPlanny.bind(this);
    this.deleteProposal = this.deleteProposal.bind(this);
  }

  componentDidMount() {
    this.props.getMyPlanniesAsync();
  }

  createNew() {
    this.props.history.push("/plannies/create");
  }

  declineParticipation(id) {
    this.props.declineParticipation(id);
  }

  approveParticipation(id) {
    this.props.approveParticipation(id);
  }

  deleteProposal(id) {
    this.props.deleteProposal(id);
  }

  cancelPlanny(id) {
    this.props.cancelParticipation(id);
  }

  gotoDetails = (id) => {
    console.log('fire');
    this.props.navigate('/plannies/edit/' + id);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className="titleWrapper">
            <div className="title"> My Plannies </div>
          </div>

          <If condition={this.props.myPlanniesState.plannies != null}>
            <MyPlannyTable
              gotoDetails={this.gotoDetails}
              deleteProposal={this.deleteProposal}
              plannies={this.props.myPlanniesState.plannies}
              approveParticipation={this.approveParticipation}
              declineParticipation={this.declineParticipation}
              createNew={() => this.createNew()} />
          </If>
        </Col>

        {/* <Col xs={12}>
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
        </Col> */}
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    myPlanniesState: state.myPlanniesState
  }),
  dispatch => ({
    ...managePlannyAsyncActionCreators(dispatch),   
    ...commonAsyncActionCreators(dispatch)
  })  
)(MyPlannies);


