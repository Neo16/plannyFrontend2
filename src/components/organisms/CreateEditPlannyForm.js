import * as React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

export class CreateEditPlannyForm extends React.Component {

  componentDidMount() {
    this.props.getSubCategoriesAsync();
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

  handleCategorySelectChange = (value) => {
    this.props.onChange("categoryIds", value)
  };

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
        items.push({
          value: categories[i].id,
          label: categories[i].name
        });
      }
    }
    return items;
  };

  customSelecStyles = {
    control: (base, state) => ({
      ...base,
      '&:hover': { borderColor: 'darkgray' }, // border style on hover     
      boxShadow: 'none',
      border: '1px solid #ced4da'     
    })
  };
  

  render() {
    return (
      <React.Fragment>
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

          <Select
            styles={this.customSelecStyles}
            isMulti
            value={this.props.planny.categoryIds}
            onChange={this.handleCategorySelectChange}
            options={this.createCategoryOptions()}
            className='react-select-container' 
            classNamePrefix="react-select"/>


        
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
            outline
            color="info"
            className="upload-btn"
            onClick={this.triggerInputFile}>
            Upload picture
          </Button>
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
    ...managePlannyAsyncActionCreators(dispatch),
    ...categoryAsyncActionCreators(dispatch),
  })
)(CreateEditPlannyForm); 