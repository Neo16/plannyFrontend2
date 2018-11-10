import * as React from 'react';
import { Button } from 'reactstrap';
import './PlannyCell.css';

export class PlannyCell extends React.Component
{
  render() {
    var p = this.props.planny;

    return (
      <div className="plannyCell">
        <div className="imageWrapper">
          {p.pictureName != null &&
            <img src={"https://edemstorage.blob.core.windows.net/pictures-container/"
              + p.pictureName} />
          }
          {p.pictureName == null &&
            <img src="http://via.placeholder.com/350x300" />
          }
        </div>
        <div className="categoryCont">
          <div className="categoryTag">
            {p.categoryNames[0]}
          </div>
        </div>
        <div className="plannyTitle">
          {p.name}
        </div>
        <div className="plannyDesc">
          {p.description}
        </div>

        <div className="plannyButtonWrapper">
          {this.props.mine &&
            <Button onClick={() => this.props.deleteProposal(p.id)} style={{ 'margin-right': '10px' }}>
              Delete
           </Button>
          }
          <Button href={"/planny/"+ p.id}>
            Details
          </Button>
        </div>
      </div>
    );
  }
}