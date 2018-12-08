import * as React from 'react';
import './PlannyCell.scss';
import { PlannyCell } from './PlannyCell'
import { ApplicantRow } from './../atoms/ApplicantRow';
import { Collapse } from 'reactstrap';
import './PlannyCellWithAplicants.css';
import If from './../atoms/If';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class PlannyCellWithAplicants extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      applicantsOpen: false
    }
  }

  toggleApplicants = () => {
    this.setState({
      ...this.state,
      applicantsOpen: !this.state.applicantsOpen
    })
  }


  render() {
    var p = this.props.planny;
    return (
      <div className="plannyCellWrapper">
        <PlannyCell
          key={p.id}
          planny={p}
          mine={true}
          deletePlanny={this.props.deletePlanny}
          gotoDetails={this.props.gotoDetails} />

        <div className="applicantsBox">
          <div
            className="applicantsHeader"
            onClick={() => { this.toggleApplicants() }} >
            Applicants
            {this.state.applicantsOpen &&
              <FontAwesomeIcon icon={"angle-up"} size="1x" />}

            {!this.state.applicantsOpen &&
              <FontAwesomeIcon icon={"angle-down"} size="1x" />}
          </div>
          <Collapse isOpen={this.state.applicantsOpen}>
            <div className="applicantsList">
              <If condition={p.participations.length > 0}>
                <Scrollbars
                  autoHeight
                  autoHeightMax={180}>
                  {p.participations.map((p) =>
                    <ApplicantRow
                      participationState={(p.state == 1)}
                      approve={() => this.props.approveParticipation(p.participationId)}
                      decline={() => this.props.declineParticipation(p.participationId)}
                      key={p.participationId}
                      name={p.userName} />
                  )}
                </Scrollbars>
              </If>
              <If condition={p.participations.length == 0}>
                <div className="applicant">
                  No applicants yet.
               </div>
              </If>
            </div>
          </Collapse>
        </div>
      </div>

    );
  }
}