import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { managePlannyAsyncActionCreators } from '../../actions/asyncActionCreators/managePlannyAsyncActionCreators';
import MyParticipationRow from './../molecules/MyParticipationRow';
import If from '../atoms/If';

export class MyParticipations extends React.Component {

    componentDidMount() {
        this.props.getMyParticipationsAsync(this.plannyId);
    }
    render() {
        return (
            <Row>
                <Col md={{ size: 8, offset: 2 }} className="mt-3">                 
                    <div className="titleWrapper">
                        <div className="title"> My participations  </div>
                    </div>
                    {this.props.myPlanniesState.participations != undefined &&
                        this.props.myPlanniesState.participations.map((p) =>
                            <MyParticipationRow
                                key={p.id}
                                participation={p}
                            />)
                    }
                </Col>
            </Row>
        )
    }
}

export default connect(
    (state) => ({
        myPlanniesState: state.myPlanniesState
    }),
    managePlannyAsyncActionCreators
)(MyParticipations); 
