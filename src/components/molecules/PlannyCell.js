import * as React from 'react';
import { Button } from 'reactstrap';
import './PlannyCell.css';
import If from './../atoms/If';

export class PlannyCell extends React.Component {
  render() {
    var p = this.props.planny;

    if (p == undefined) {
      return (<div></div>)
    }

    return (
      <div className="plannyCell">
        <div className="imageWrapper">
          {p.pictureUrl != null &&
            <img src={p.pictureUrl} />
          }
          {p.pictureUrl == null &&
            <img src="http://via.placeholder.com/350x300" />
          }
        </div>
        <div className="categoryCont">
          {(p.categories.length > 0) &&
            <div className="categoryTag">
              {p.categories[0].name}
            </div>
         }
        </div>
        <div className="plannyTitle">
          {p.name}
        </div>
        <div className="plannyDesc">
          {p.description}
        </div>

        <div className="plannyButtonWrapper">
          <If condition={this.props.mine}>
            <Button
              className={"float-left"}
              onClick={() => this.props.deleteProposal(p.id)}
              outline color="danger">
              Delete
           </Button>
          </If>
          <Button
            outline color="info"
            href={"/plannies/" + p.id}>
            Details
          </Button>
        </div>
      </div>
    );
  }
}