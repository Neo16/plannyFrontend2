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
import DialogModal from '../organisms/DialogModal';

export class MyPlannies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      plannyToDeleteId: undefined
    }
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

  trydeletePlanny = (id) => {
    this.setState({
      ...this.state,
      showDeleteModal: true,
      plannyToDeleteId: id
    });
  }

  onDeleteOk = (id) => {
    this.deletePlanny(this.state.plannyToDeleteId);
    this.hideDeleteModal();
  }

  hideDeleteModal = () => {
    this.setState({
      ...this.state,
      showDeleteModal: false,
    });
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
              deletePlanny={this.trydeletePlanny}
              plannies={this.props.myPlanniesState.plannies}
              approveParticipation={this.approveParticipation}
              declineParticipation={this.declineParticipation}
              createNew={() => this.createNew()} />
          </If>
        </Col>

        <If condition={this.state.showDeleteModal}>
          <DialogModal
            width="500px"
            header="Confirm delete"
            body="Are you sure you want to delete this planny?"
            ok={() => { this.onDeleteOk() }}
            cancel={() => { this.hideDeleteModal() }}
            positiveButtonText="Yes, delete"
            negativeButtonText="No"
            hasNegativeButton={true}
          />
        </If>
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


