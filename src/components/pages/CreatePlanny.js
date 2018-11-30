import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators'
import { ApplicationState } from '../..';
import { Row, Col } from 'reactstrap';

export class CreatePlanny extends React.Component {
  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3} className="titleWrapper">
          <div style={{'marginLeft':'-15px'}} className="title">Create Planny</div>
        </Col>
        <CreateEditPlannyForm
          createPlannyProposal={this.props.createPlannyProposal}
          uploadPlannyPicture={this.props.uploadPlannyPicture}
          getCategories={this.props.getCategories}
          editCreateState={this.props.state} />
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    state: state.editCreatePlanny,
  }),
  plannyAsyncActionCreators
)(CreatePlanny); 