import * as React from 'react';
import { Row, Col, FormGroup, Button, Media, Input } from 'reactstrap';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateEditPlannyForm.scss'


export class CreateEditPlannyForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.handleFromTimeTimeChage = this.handleFromTimeTimeChage.bind(this);
    this.handleToTimeTimeChage = this.handleToTimeTimeChage.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.props.onChange(name, e.target.value);
  }

  handleFromTimeTimeChage(value) {
    this.props.onChange("FromTime", value);
  }

  handleToTimeTimeChage(value) {
    this.props.onChange("ToTime", value);
  }

  componentDidMount() {
    this.props.getCategoriesAsync();
  }

  uploadPicture(e) {
    console.log(e.target.files);
    this.uploadCalled = true;
    let file = e.target.files[0];
    this.props.uploadPlannyPictureAsync(file);
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
          {this.props.pictureUploadState.uplodedPictureUrl != '' &&
            <img
              src={this.props.pictureUploadState.uplodedPictureUrl}
              className="plannyPic rounded img-fluid" />
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
          </div>

          <FormGroup className={"mt-2"}>
            <DatePicker
              className={"form-control"}
              onChange={this.handleFromTimeTimeChage}
              selected={this.props.planny.FromTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <DatePicker
              className={"form-control"}
              onChange={this.handleToTimeTimeChage}
              selected={this.props.planny.ToTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />          
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
  dispatch => ({
    ...plannyAsyncActionCreators(dispatch),
    ...categoryAsyncActionCreators(dispatch)
  })
)(CreateEditPlannyForm); 