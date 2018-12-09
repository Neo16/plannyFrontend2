import * as React from 'react';
import { Button } from 'reactstrap';
import If from '../atoms/If';
import './DialogModal.css';

export class DialogModal extends React.Component {  
    // todo pass with
    // láthatóság state-be?
    // nyitás / zárás is külsőleg... 
    // todo transition osztályok..? vagy csak show / hide animate     
    //lesz egy hiba és egy confirm a főoldalon...   
    render() {
        return (
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header text-info">
                            {this.props.header}
                        </div>
                        <div class="modal-body">
                            {this.props.body}
                        </div>
                        <div class="modal-footer">
                            <Button
                                outline
                                color="info"
                                onClick={() => this.cancel()}>
                                {this.props.positiveButtonText}
                            </Button>

                            <If condition={this.props.hasNegativeButton}>
                                <Button
                                    onClick={() => this.ok()}>
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