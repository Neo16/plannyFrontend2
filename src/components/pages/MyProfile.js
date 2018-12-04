import * as React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { accountAsyncActionsCreators } from '../../actions/asyncActionCreators/accountAsyncActionsCreators';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

export class MyProfile extends React.Component {

    componentDidMount() {
        this.props.getMyProfileAsync();
    }


    handleChange = (e) => {
        const name = e.target.name;
        this.props.onChange(name, e.target.value);
    }

    handleBirthDateChage = (value) => {

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

        if (this.props.accountState.profile == undefined){
            return(null);
        }

        return (
            <React.Fragment>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        value={this.props.accountState.profile.userName}
                        placeholder="Username"
                        name="userName"
                        onChange={this.handleChange} />
                    <Label>Introduction</Label>
                    <Input
                        type="textarea"
                        name="selfIntroduction"
                        value={this.props.accountState.profile.selfIntroduction}
                        placeholder="about me"
                        onChange={this.handleChange} />
                    <Label>Category</Label>
                </FormGroup>

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
        accountState: state.accountState
    }),
    dispatch => ({
        ...accountAsyncActionsCreators(dispatch)
    })
)(MyProfile); 