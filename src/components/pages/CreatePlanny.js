import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators'
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'reactstrap';

export class CreatePlanny extends React.Component {
  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3} className="titleWrapper">
          <div style={{ 'marginLeft': '-15px' }} className="title">Create Planny</div>
        </Col>

        <CreateEditPlannyForm />
        
        <Button
          bsStyle="primary"
          onClick={() => this.addPlanny()}>
          Add Planny
          </Button>
      </Row>
    );
  }
}

// Todo:
// - Itt kell a create actiont hívni 
// - a kép feltöltés a formon intéződik. 

export default connect(
  plannyAsyncActionCreators
)(CreatePlanny); 