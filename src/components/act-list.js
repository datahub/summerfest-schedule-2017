import React, { Component } from 'react';
import Act from './act.js';

class ActList extends Component {
    render() {
        if (this.props.acts.length > 0) {
            let acts = this.props.acts.map((act, i) => {
                return (
                    <Act key={i} data={act} /> 
                );
            });
            return (
                <div className="actlist">
                    {acts}
                </div>
            )
        } else {
            return (
                <div className="actlist actlist--empty">
                    Please remove some filters to see acts.
                </div>
            )
        }
    }
}

export default ActList;