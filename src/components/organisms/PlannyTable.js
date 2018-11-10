import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { PlannyCell } from '../molecules/PlannyCell';
import './PlannyTable.css';

export class PlannyTable extends React.Component {

  render() {
    if(!this.props.plannies){
        return null;
    }
    return (     
      <Row className="planniesRow"> 
        {this.props.plannies.map((p) =>
          <Col key={p.id} md={4} sm={6}>
            <div className="plannyCellWrapper">
              <PlannyCell key={p.id} planny={p} gotoDetails={this.props.gotoDetails} />
            </div>
          </Col>)}
      </Row>
    );
  }
}
