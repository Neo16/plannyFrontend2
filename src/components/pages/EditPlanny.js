import * as React from 'react';
import CreateEditPlannyForm from '../organisms/CreateEditPlannyForm';
import { connect } from 'react-redux';
import { publicPlannyAsyncActionCreators } from '../../actions/asyncActionCreators/publicPlannyAsyncActionCreators';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators'
import { ApplicationState } from '../..';
import { Row, Col, Button } from 'reactstrap';
import If from '../../components/atoms/If';

export class EditPlanny extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planny: {
        name: "",
        description: "",
        categoryIds: ["-1"],
        fromTime: new Date(),
        toTime: new Date(),
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let oPlanny = this.props.acquirePlanniesState.plannyDetail;
    let nPlanny = nextProps.acquirePlanniesState.plannyDetail;

    if (nPlanny && (oPlanny == undefined || nPlanny != oPlanny)) {
      this.setState({
        planny: {
          ...nPlanny,
          fromTime: new Date(nPlanny.fromTime),
          toTime: new Date(nPlanny.toTime),
        }
      });
    }
  }

  componentDidMount() {
    this.plannyId = parseInt(this.props.match.params.id);
    this.props.getPlannyAsync(this.plannyId);
  }

  editPlanny = () => {
    this.props.updatePlannyAsync(this.state.planny.id, JSON.stringify({
      ...this.state.planny,
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
        <Col xl={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} className="mt-3">
          <div className="title">Edit Planny</div>
          <If condition={this.props.acquirePlanniesState.plannyDetail != undefined}>
            <div className="basicForm mt-3">
              <CreateEditPlannyForm
                onChange={this.handleFieldChange}
                planny={this.state.planny}
                className="mt-2" />
              <div className="d-flex flex-row-reverse">
                <Button
                  color="info"
                  className="align"
                  onClick={this.editPlanny}>
                  Save Planny
                </Button>
              </div>
            </div>
          </If>
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    pictureUploadState: state.pictureUploadState,
    acquirePlanniesState: state.acquirePlanniesState
  }),
  dispatch => ({
    ...publicPlannyAsyncActionCreators(dispatch),
    ...managePlannyAsyncActionCreators(dispatch)
  })
)(EditPlanny); 