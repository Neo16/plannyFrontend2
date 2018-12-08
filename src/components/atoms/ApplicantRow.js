import * as React from 'react';
import { ToggleButton } from './ToggleButton'

export class ApplicantRow extends React.Component {
    render() {
        return (
            <div className="applicant">
                <span>{this.props.name}</span>
                <ToggleButton
                    className="float-right"
                    positiveText="Decline"
                    negativeText="Approve"
                    isPositive={this.props.participationState}
                    onPositive={this.props.approve}
                    onNegative={this.props.decline} />
            </div>
        );
    }
}
