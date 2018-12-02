import * as React from 'react';
import './Switch.css';

export class Switch extends React.Component
{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.checked){
            this.props.onPositiveTogle();
        }
        else{
            this.props.onNegativeTogle();
        }    
    }

    render() {
        return (
            <span className="switchBox">
                <label className="switch">
                    <input type="checkbox" onChange={this.handleChange} />
                    <span className="slider round"></span>
                </label>
            </span>
        );
    }
}