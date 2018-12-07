import * as React from 'react';
import { FormGroup, Button, Input, Label, Row, Col } from 'reactstrap';
import { accountAsyncActionsCreators } from '../../actions/asyncActionCreators/accountAsyncActionsCreators';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { uploadPictureApiCall } from '../../CommonService';

export class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                userName: "",
                birthDate: new Date(),
                gender: 0,
                selfIntroduction: "",
                pictureUrl: undefined,
            }
        }
    }

    componentDidMount() {
        this.props.getMyProfileAsync();
    }

    componentWillReceiveProps(nextProps) {
        let oProfile = this.props.accountState.profile;
        let nProfile = nextProps.accountState.profile;

        if (nProfile && (oProfile == undefined || nProfile != oProfile)) {
            this.setState({
                profile: {
                    ...nProfile,
                    birthDate: new Date(nProfile.birthDate),
                }
            });
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        this.handleFieldChange(name, e.target.value);
    }

    handleFieldChange = (name, value) => {
        this.setState({
            profile: {
                ...this.state.profile,
                [name]: value
            }
        });
    }

    handleBirthDateChange = (value) => {
        this.handleFieldChange("birthDate", value);
    }

    uploadPicture = (e) => {
        let file = e.target.files[0];
        this.props.uploadPlannyPictureAsync(file);

        uploadPictureApiCall({
            picture: file,
            onSuccess: (data) => {
                this.sate.profile.pictureUrl = data;
            }
        });
    }

    triggerInputFile = () => {
        this.fileInput.click();
    }

    saveProfile = () => {
        this.props.editMyProfileAsync(JSON.stringify(this.state.profile));
    }

    render() {

        if (this.props.accountState.profile == undefined) {
            return (null);
        }

        return (
            <Row>
                <Col md={{ size: 6, offset: 3 }} className="mt-3">
                    <div className="title">My profile</div>
                    <div className="basicForm mt-3">

                        <div className="d-flex justify-content-center mb-3">
                            {this.state.profile.pictureUrl != null &&
                                <img src={this.state.profile.pictureUrl}
                                    className="profile-img img-fluid" />
                            }
                        </div>

                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                value={this.state.profile.userName}
                                placeholder="Username"
                                name="userName"
                                onChange={this.handleChange} />

                            <Label>Birthdate</Label>
                            <DatePicker
                                className={"form-control"}
                                onChange={this.handleBirthDateChange}
                                selected={this.state.profile.birthDate}
                                dateFormat="MMMM d, yyyy" />

                            <Label>Gender</Label>
                            <Input type="select" name="gender"
                                onChange={this.handleChange}
                                value={this.state.profile.gender}>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </Input>

                            <Label>About me</Label>
                            <Input
                                rows="5"
                                type="textarea"
                                name="selfIntroduction"
                                value={this.state.profile.selfIntroduction}
                                placeholder="about me"
                                onChange={this.handleChange} />


                        </FormGroup>


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


                        <div className="d-flex flex-row-reverse mt-2">
                            <Button
                                color="info"
                                className="align"
                                onClick={this.saveProfile}>
                                Save profile
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
        accountState: state.accountState
    }),
    dispatch => ({
        ...accountAsyncActionsCreators(dispatch),
        ...managePlannyAsyncActionCreators(dispatch),
    })
)(MyProfile); 