import * as React from 'react';
import { Row, Col, FormGroup, Button, Media, Input } from 'reactstrap';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { connect } from 'react-redux';
import './CreateEditPlannyForm.scss'

export class CreatePlannyForm extends React.Component {

  uploadCalled;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.props.onChange(name, e.target.value);
  }

  componentDidMount() {
    this.uploadCalled = false;
    this.props.getCategoriesAsync();
  }

  // uploadPicture(e) {
  //   this.uploadCalled = true;
  //   let file = e.target.files[0];
  //   this.props.uploadPlannyPicture(file);
  // } 

  createCategoryOptions() {
    let items = [];
    let categories = this.props.appCommonState.subCategories;

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
        <div className={"basicForm " + (this.props.className || "")}>
          {this.props.pictureUploadState.uplodedPictureUrl != '' &&
            <Media
              data-src={this.props.pictureUploadState.uplodedPictureUrl}
              className="plannyPic rounded img-fluid"/>
          }
          <FormGroup>
            <Input
              type="text"
              value={this.props.planny.Name}
              placeholder="Name"
              name="Name"
              onChange={this.handleChange} />
            <Input
              type="textarea"
              name="Description"             
              value={this.props.planny.Description}
              placeholder="Description"
              onChange={this.handleChange} />
            <Input
              onChange={this.handleChange}
              value={this.props.planny.CategoryId}
              name="CategoryId"
              placeholder="Choose a category"
              type="select">
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
              value={this.props.planny.FromTime}
              onChange={this.handleChange}>
            </Input>
            <Input
              name="ToTime"
              type="datetime-local"
              value={this.props.planny.ToTime}
              onChange={this.handleChange}>
            </Input>
          </FormGroup>
        </div>
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