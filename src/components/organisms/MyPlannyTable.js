import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { PlannyCellWithAplicants } from '../molecules/PlannyCellWithApplicants';

export class MyPlannyTable extends React.Component {

  render() {
    return (
      <Row>
        {this.props.plannies.map((p) =>
          <Col key={p.id} md={4} sm={6}>
            <PlannyCellWithAplicants
              mine = {true}
              approveParticipation={this.props.approveParticipation}
              declineParticipation={this.props.declineParticipation}
              key={p.id} planny={p}
              deleteProposal={this.props.deleteProposal}
              gotoDetails={this.props.gotoDetails} />
          </Col>)}

        <Col md={4} sm={6}>
          <div className="createNewLink" onClick={this.props.createNew}>
            <img className="createLinkIcon" src={"/plus.svg"} />
          </div>
        </Col>
      </Row>
    );
  }
}
