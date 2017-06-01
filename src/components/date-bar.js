import React, { Component } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class DateBar extends Component {
    
    formatDate = (d) => {
        return (d.getMonth()+1) + '/' + d.getDate();
    }
    formatDay = (d) => {
        return days[d.getDay()];
    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.onSelectedDayChange(e.target.dataset.date, e.target.dataset.num);
        window.projectsEvent('summerfest-favorites','select day',e.target.dataset.num);
    }
    render() {
        let dates = this.props.dates.map((day, i) => {
            return (
                <div
                    className={"datebar--item" + (this.props.selectedDay === this.formatDate(day) ? ' datebar--active' : '')}
                    key={i}
                    data-num={i+1}
                    data-date={this.formatDate(day)}
                    onClick={this.handleClick}>
                        <span className="datebar--top">{this.formatDay(day)}</span>
                        {this.formatDate(day)}
                </div>
            );
        });
        return (
            <div className="datebar">
                {dates}
            </div>
        );
    }
}

export default DateBar;