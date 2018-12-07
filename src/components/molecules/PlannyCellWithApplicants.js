import * as React from 'react';
import './PlannyCell.scss';
import { PlannyCell } from './PlannyCell'
import { ApplicantRow } from './../atoms/ApplicantRow';
import './PlannyCellWithAplicants.css';
import If from './../atoms/If';

export class PlannyCellWithAplicants extends React.Component {
  render() {
    var p = this.props.planny;

    console.log(p.participants);

    return (
      <div className="plannyCellWrapper">
        <PlannyCell
          key={p.id}
          planny={p}
          mine={true}
          deletePlanny={this.props.deletePlanny}
          gotoDetails={this.props.gotoDetails} />

        <div className="applicantsBox">
          <div className="applicantsHeader">
            Applicants
            <span className="right"> approve</span>
          </div>
          <div className="applicantsList">
            <If condition={p.participations.length > 0}>
              {p.participations.map((p) =>
                <ApplicantRow
                  approve={() => this.props.approveParticipation(p.participationId)}
                  decline={() => this.props.declineParticipation(p.participationId)}
                  key={p.participationId}
                  name={p.userName} />
              )}
            </If>
            <If condition={p.participations.length == 0}>
              <div className="applicant">
                No applicants yet.
               </div>
            </If>
          </div>
        </div>
      </div>

    );
  }
}