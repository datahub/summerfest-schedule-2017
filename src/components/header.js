import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <img className="header--logo" src="media/js-logo.png" alt="Journal Sentinel" /> <span className="header--color">Summerfest</span> Schedule
            </div>
        );
    }
}

export default Header;