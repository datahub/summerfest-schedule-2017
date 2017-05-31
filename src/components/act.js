import React, { Component } from 'react';

class ActList extends Component {
    formatTime = (s) => {
        let t = new Date(s);
        let hour = t.getHours();
        let minute = t.getMinutes();
        let suffix = (hour >= 12)? 'am' : 'pm';
        minute = (minute.toString().length === 1)? '0' + minute : minute;
        hour = (hour >= 12)? hour - 12 : hour;
        hour = (hour === 0)? 12 : hour;
        return hour + ':' + minute + ' ' + suffix;
    }
    render() {
        const act = this.props.data;
        // <span className="actlist--favorite"><i className="fa fa-star" aria-hidden="true"></i>favorite</span>
        return (
            <div className="actlist--item">
                <div className="actlist--inner">
                    <div className="actlist--left">
                        <span className="catilist--time">{this.formatTime(act.date_time)}</span>
                    </div>
                    <div className="actlist--right">
                        <div className="actlist--artist"><strong>{act.artist}</strong></div>
                        <div className="actlist--stage"><i className="fa fa-map-marker" aria-hidden="true"></i>{act.stage}</div>
                        
                        {act.headliner ? (
                            <span className="actlist--headliner">headliner</span>
                        ) : (
                            ''
                        )}
                        {act.local ? (
                            <span className="actlist--local">local</span>
                        ) : (
                            ''
                        )}
                        {act.bio ? (
                            <span className="actlist--bio">bio</span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ActList;