import * as React from 'react';
import { Switch } from './Switch'

export class  ApplicantRow extends React.Component
{  
    render() {
        return (
            <div className="applicant">
                {this.props.name}
                <Switch onPositiveTogle={this.props.approve} onNegativeTogle={this.props.decline} />
            </div>
        );
    }
}
     