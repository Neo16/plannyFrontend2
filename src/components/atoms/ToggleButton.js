import * as React from 'react';
import { Button } from 'reactstrap';
import If from '../../components/atoms/If';

export class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        if (this.props.isPositive) {
            this.props.onNegative();
        }
        else {
            this.props.onPositive();
        }
    }

    render() {
        return (
            <Button
                className = {"toggle-button " + this.props.className}
                outline
                onClick={() => { this.handleChange() }}>
                <If condition={this.props.isPositive}>{this.props.positiveText}</If>
                <If condition={!this.props.isPositive}>{this.props.negativeText}</If>
            </Button>
        );
    }
}