import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'reactstrap';
import './../../global.css';

export class CreatePlanny extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planny: {
        name: "",
        description: "",
        categoryIds: [],
        fromTime: new Date(),
        toTime: new Date(),
      }
    }
  }

  createPlanny = () => {
    this.props.createPlannyAsync(JSON.stringify({
      ...this.state.planny,
      pictureUrl: this.props.pictureUploadState.uplodedPictureUrl,
      categoryIds: this.state.planny.categoryIds.map(c => c.value)
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
      <Col xl={{ size: 6, offset: 3 }} md= {{ size: 8, offset: 2 }} sm={{size:10, offset: 1}} className="mt-3">
          <div className="title">Create Planny</div>
          <div className="basicForm mt-3">
            <CreateEditPlannyForm
              planny={this.state.planny}
              onChange={this.handleFieldChange} />
            <div className="d-flex flex-row-reverse">
              <Button
                color="info"
                className="align"
                onClick={this.createPlanny}>
                Add Planny
            </Button>
            </div>
          </div>
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