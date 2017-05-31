import React, { Component } from 'react';

class ActList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            favorited: false
        };
    }
    formatTime = (s) => {
        let t = new Date(s);
        let hour = t.getHours();
        let minute = t.getMinutes();
        minute = (minute.toString().length === 1)? '0' + minute : minute;
        hour = (hour >= 12)? hour - 12 : hour;
        hour = (hour === 0)? 12 : hour;
        return hour + ':' + minute;
    }
    formatSuffix = (s) => {
        let t = new Date(s);
        let hour = t.getHours();
        let suffix = (hour >= 12)? 'am' : 'pm';
        return suffix;
    }
    handleMoreToggle = () => {
        this.setState({show: !this.state.show});
    }
    handleFavoritedToggle = () => {
        let favs = window.localStorage.getItem('favs');
        if (favs === null) {
            favs = [];
        } else {
            favs = JSON.parse(favs);
        }
        if (this.state.favorited) {
            let pos = favs.indexOf(this.props.data.artist);
            if (pos !== -1) {
                favs.splice(pos, 1);
            }
        } else {
            favs.push(this.props.data.artist);
        }
        window.localStorage.setItem('favs', JSON.stringify(favs));
        this.setState({favorited: !this.state.favorited});
    }
    render() {
        const act = this.props.data;
        return (
            <div className={"actlist--item" + (this.state.show ? ' actlist-more' : '')}>
                <div className="actlist--inner">
                    <div className="actlist--left">
                        <span className="actlist--time">{this.formatTime(act.date_time)}</span>
                        <br />
                        <span className="actlist--suffix">{this.formatSuffix(act.date_time)}</span>
                    </div>
                    <div className="actlist--right">
                        <div className="actlist--artist">
                            <strong>{act.artist}</strong>
                        </div>
                        <span className="actlist--favorite" onClick={this.handleFavoritedToggle}>
                            <i className={"fa" + (this.state.favorited ? ' fa-star' : ' fa-star-o')} aria-hidden="true"></i>
                        </span>
                        <div className="actlist--stage">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>{act.stage}
                        </div>
                        
                        {act.genre ? (
                            <span className="actlist--genre"><i className="fa fa-music" aria-hidden="true"></i>{act.genre}</span>
                        ) : (
                            ''
                        )}
                        {act.headliner ? (
                            <span className="actlist--headliner"><i className="fa fa-microphone" aria-hidden="true"></i>headliner</span>
                        ) : (
                            ''
                        )}
                        {act.recommended ? (
                            <span className="actlist--pick"><i className="fa fa-user" aria-hidden="true"></i>Piet's Pick</span>
                        ) : (
                            ''
                        )}
                        {act.local ? (
                            <span className="actlist--local">local</span>
                        ) : (
                            ''
                        )}
                        {act.bio ? (
                            <span className="actlist--bio" onClick={this.handleMoreToggle}>read more</span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                {act.bio ? (
                    <div className="act-biowrapper">
                        <div className="act-bioleft"></div>
                        <div className="act-bioright">
                            {act.bio}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default ActList;