import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators'
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'reactstrap';

export class CreatePlanny extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planny: {
        Name: "",
        Description: "",
        CategoryId: "-1",
        FromTime: new Date(),
        ToTime: new Date(),       
      }
    }

    this.addPlanny = this.addPlanny.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  addPlanny() {
    this.props.createPlannyProposalAsync(JSON.stringify({
      ...this.state.planny,      
      PictureUrl:  this.props.pictureUploadState.uplodedPictureUrl    
    }));
    console.log(JSON.stringify(this.state));
  }

  handleFieldChange(name, value) {
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
            onClick={this.addPlanny}>
            Add Planny
          </Button>
        </Col>
      </Row>
    );
  }
}

// Todo:
// - a kép feltöltés a formon intéződik. 

export default connect(
  (state) => ({
    pictureUploadState: state.pictureUploadState,    
  }),
  plannyAsyncActionCreators
)(CreatePlanny); 