import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

export default class MyParticipationRow extends React.Component {
    render() {
        return (
            <div className="d-flex align-items-center">                
                <span>{this.props.participation.plannyName}</span>
            </div>
        )
    }
}