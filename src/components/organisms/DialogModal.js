import * as React from 'react';
import { Button } from 'reactstrap';
import If from '../atoms/If';
import './DialogModal.css';

export  class DialogModal extends React.Component {  
    // todo pass with  
    // todo transition osztályok..? vagy csak show / hide animate     
    render() {
        return (
            <div className="modal-mask">
                <div className="modal-wrapper">
                    <div className="modal-container">
                        <div className="modal-header text-info">
                            {this.props.header}
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                        </div>
                        <div className="modal-footer">
                            <Button
                                outline
                                color="info"
                                onClick={() => this.props.ok()}>
                                {this.props.positiveButtonText}
                            </Button>

                            <If condition={this.props.hasNegativeButton}>
                                <Button
                                    onClick={() => this.props.cancel()}>
                                    {this.props.negativeButtonText}
                                </Button>
                            </If>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}