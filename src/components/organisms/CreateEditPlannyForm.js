import * as React from 'react';
import { Row, Col, FormGroup, Button, Media, Input } from 'reactstrap';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { connect } from 'react-redux';
import './CreateEditPlannyForm.scss'

export class CreatePlannyForm extends React.Component {

  uploadCalled;

  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Description: "",
      CategoryId: "-1",
      FromTime: '',
      ToTime: '',
      PictureName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  componentDidMount() {
    this.uploadCalled = false;
    this.props.getCategoriesAsync();
  }

  uploadPicture(e) {
    this.uploadCalled = true;
    let file = e.target.files[0];
    this.props.uploadPlannyPicture(file);
  }

  addPlanny() {
    this.props.createPlannyProposal(JSON.stringify({
      ...this.state,
      PictureName: this.props.editCreateState.UploadedPictureName
    }));
    console.log(JSON.stringify(this.state));
  }

  createCategoryOptions() {
    let items = [];
    let categories = this.props.appCommonState.categories;

    if (categories != undefined && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        items.push(
          <option key={categories[i].id} value={categories[i].id}>
            {categories[i].name}
          </option>);
      }
    }
    return items;
  }

  render() {
    return (
      <React.Fragment>
        <Col md={6} mdOffset={3} className="basicForm">
          {this.props.pictureUploadState.uplodedPictureUrl != '' &&
            <Media data-src={this.props.pictureUploadState.uplodedPictureUrl}
              className="plannyPic"
              rounded
              responsive />
          }
          <FormGroup
            controlId="formBasicText">
            <Input
              type="text"
              value={this.state.Name}
              placeholder="Name"
              name="Name"
              onChange={this.handleChange} />
            <Input
              componentClass="textarea"
              name="Description"
              type="text"
              value={this.state.Description}
              placeholder="Description"
              onChange={this.handleChange} />
            <Input
              onChange={this.handleChange}
              value={this.state.CategoryId}
              name="CategoryId"
              placeholder="Choose a category"
              componentClass="select">
              <option value="-1" disabled>Choose a Category</option>
              {this.createCategoryOptions()}
            </Input>
          </FormGroup>

          <div className="upload-btn-wrapper">
            <Input
              name="Picture"
              type="file"
              onChange={this.uploadPicture}>
            </Input>
            <Button
              className="upload-btn"
              onClick={() => this.addPlanny()}>
              Upload cover photo
            </Button>
          </div>

          <FormGroup>
            <Input
              name="FromTime"
              type="datetime-local"
              value={this.state.FromTime}
              onChange={this.handleChange}>
            </Input>
            <Input
              name="ToTime"
              type="datetime-local"
              value={this.state.ToTime}
              onChange={this.handleChange}>
            </Input>
          </FormGroup>
        </Col>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    pictureUploadState: state.pictureUploadState,
    appCommonState: state.appCommonState
  }),
  categoryAsyncActionCreators  
)(CreatePlannyForm); 