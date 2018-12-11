import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { Button } from 'reactstrap';
import './MyParticipationRow.css';
import { Link } from 'react-router-dom';


export default class MyParticipationRow extends React.Component {
    render() {

        var pa = this.props.participation;
        var fromTimeMoment = moment(pa.plannyFromTime);
        var toTimeMoment = moment(pa.plannyToTime);
        var fromTimeStr = fromTimeMoment.isSame(new Date(), 'year')
            ? fromTimeMoment.format('MMM.DD. h a')
            : fromTimeMoment.format('YYYY.MMM.DD. h a');
        var toTimeStr = toTimeMoment.isSame(new Date(), 'year')
            ? toTimeMoment.format('MMM.DD. h a')
            : toTimeMoment.format('YYYY.MMM.DD. h a');

        return (
            <div className="my-participation-row">
                <div className="part-planny-img-wrapper">
                    <img className="part-planny-img" src={pa.plannyPictureUrl} />
                </div>
                <div className="part-planny-middle-block">
                    <div>
                        <span className="part-planny-title">
                            <Link to={'/plannies/' + pa.plannyId}>{pa.plannyName}</Link>
                        </span>
                        <span className="part-planny-owner">by {pa.ownerName}</span>
                    </div>
                    <div className="categoryCont">
                        {pa.plannyCategories != undefined && pa.plannyCategories.map(c => (
                            <div className="categoryTag" key={c.id}>
                                {c.name}
                            </div>
                        ))}
                    </div>
                    <div className="part-attendees">
                        <span className="pr-2">Accepted attendees: {pa.numOfAcceptedAttendees},</span>
                        <span className="pr-2">Requested: {pa.numOfRequestedAttendees},</span>
                        <span>my status: <b>{pa.state}</b></span>
                    </div>
                </div>
                <div className="part-planny-time-block">
                    <div>{fromTimeStr}</div>
                    <div>{toTimeStr} </div>
                    <div className="align-self-end">
                        <Button outline>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}