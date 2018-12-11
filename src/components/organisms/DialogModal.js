import * as React from 'react';
import { Button } from 'reactstrap';
import If from '../atoms/If';
import './DialogModal.css';

export default class DialogModal extends React.Component {
    // todo transition osztályok..? vagy csak show / hide animate  

    componentDidMount = () => {
        document.addEventListener('click', this.handleClick, false);
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClick, false);
        document.addEventListener("keydown", this.escFunction, false);
    }
    handleClick = (e) => {
        var dialog = this.refs.dialog;
        if (!dialog.contains(e.target)) {
            if (this.props.cancel != undefined) {
                this.props.cancel();
            }
        }
    }

    escFunction = (e) => {
        if (e.keyCode === 27) {
            if (this.props.cancel != undefined) {
                this.props.cancel();
            }
        }
    }

    render() {
        return (
            <div className="modal-mask">
                <div className="modal-wrapper">
                    <div style={{ width: this.props.width ? this.props.width : '300px' }}
                        className="modal-container"
                        ref="dialog">
                        <div className="modal-header text-info">
                            {this.props.header}
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                        </div>
                        <div className="modal-footer">
                            <If condition={this.props.hasNegativeButton}>
                                <Button
                                    outline
                                    onClick={() => this.props.cancel()}>
                                    {this.props.negativeButtonText}
                                </Button>
                            </If>
                            <Button
                                outline
                                color="info"
                                onClick={() => this.props.ok()}>
                                {this.props.positiveButtonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}