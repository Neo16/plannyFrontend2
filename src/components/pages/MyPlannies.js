import * as React from 'react';
import { connect } from 'react-redux';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import { commonAsyncActionCreators } from '../../actions/asyncActionCreators/commonAsyncActionCreators';
import { ApplicationState } from '../..';
import { MyPlannyTable } from '../organisms/MyPlannyTable';
import { Row, Col, Button } from 'reactstrap';
import If from '../atoms/If';
import './MyPlannies.css';
import { push } from 'connected-react-router';

export class MyPlannies extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMyPlanniesAsync();
  }

  createNew = () => {
    this.props.navigate('/plannies/create');
  }

  declineParticipation = (id) => {
    this.props.declineParticipationAsync(id);
  }

  approveParticipation = (id) => {
    this.props.approveParticipationAsync(id);
  }

  deletePlanny = (id) => {
    this.props.deletePlannyAsync(id);
  }

  cancelPlanny = (id) => {
    this.props.cancelParticipationAsync(id);
  }

  gotoDetails = (id) => {   
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
              deletePlanny={this.deletePlanny}
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


