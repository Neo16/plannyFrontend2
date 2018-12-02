import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators'
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'reactstrap';

export class CreatePlanny extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planny: {
        name: "",
        description: "",
        categoryId: "-1",
        fromTime: new Date(),
        toTime: new Date(),       
      }
    }       
  }

  createPlanny =() => {
    this.props.createPlannyAsync(JSON.stringify({
      ...this.state.planny,      
      PictureUrl:  this.props.pictureUploadState.uplodedPictureUrl    
    }));
    console.log(JSON.stringify(this.state));
  }

  handleFieldChange = (name, value) => {
    this.setState({
      planny: {
       ...this.state.planny,
       [name]: value
      }
    });
  }

  render() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }} className="mt-3">
          <div className="title">Create Planny</div>
          <CreateEditPlannyForm
            onChange={this.handleFieldChange}
            planny={this.state.planny}
            className="mt-2" />
          <Button
            className="float-right mt-2"           
            onClick={this.createPlanny}>
            Add Planny
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    pictureUploadState: state.pictureUploadState,    
  }),
  managePlannyAsyncActionCreators
)(CreatePlanny); 