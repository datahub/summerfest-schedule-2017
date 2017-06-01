import React, { Component } from 'react';
import Act from './act.js';

class ActList extends Component {
    render() {
        if (this.props.acts.length > 0) {
            let acts = this.props.acts.map((act) => {
                return (
                    <Act key={act.id} data={act} /> 
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
                    Please remove some filters or add some favorites to see acts.
                </div>
            )
        }
    }
}

export default ActList;