import * as React from 'react';
import { Row, Col, FormGroup, Button, Media, Input, Label } from 'reactstrap';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateEditPlannyForm.css'


export class CreateEditPlannyForm extends React.Component {

  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    this.props.getCategoriesAsync();
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.props.onChange(name, e.target.value);
  }

  handleFromTimeTimeChage = (value) => {
    this.props.onChange("FromTime", value);
  }

  handleToTimeTimeChage = (value) => {
    this.props.onChange("ToTime", value);
  }

  uploadPicture = (e) => {
    console.log(e.target.files);
    this.uploadCalled = true;
    let file = e.target.files[0];
    this.props.uploadPlannyPictureAsync(file);
  }

  triggerInputFile = () => {
    this.fileInput.click();
  }

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
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={this.props.planny.name}
              placeholder="Name"
              name="name"
              onChange={this.handleChange} />
            <Label>Description</Label>
            <Input
              type="textarea"
              name="description"
              value={this.props.planny.description}
              placeholder="Description"
              onChange={this.handleChange} />
            <Label>Category</Label>
            <Input
              onChange={this.handleChange}
              value={this.props.planny.categoryId}
              name="categoryId"
              placeholder="Choose a category"
              type="select">
              <option value="-1" disabled>Choose a Category</option>
              {this.createCategoryOptions()}
            </Input>
          </FormGroup>

          <Label>Starting time</Label>
          <DatePicker
            className={"form-control"}
            onChange={this.handleFromTimeTimeChage}
            selected={this.props.planny.fromTime}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time" />
          <Label>Finishing time</Label>
          <DatePicker
            className={"form-control"}
            onChange={this.handleToTimeTimeChage}
            selected={this.props.planny.toTime}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time" />

          {this.props.pictureUploadState.uplodedPictureUrl != null &&
            <img
              src={this.props.pictureUploadState.uplodedPictureUrl}
              className="plannyPic rounded img-fluid" />
          }

          <div className="upload-btn-wrapper">
            <Label>Picture</Label>
            <input
              ref={fileInput => this.fileInput = fileInput}
              name="picture"
              type="file"
              onChange={this.uploadPicture}>
            </input>
            <Button
              className="upload-btn"
              onClick={this.triggerInputFile}>
              Upload picture
          </Button>
          </div>
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
  dispatch => ({
    ...plannyAsyncActionCreators(dispatch),
    ...categoryAsyncActionCreators(dispatch)
  })
)(CreateEditPlannyForm); 