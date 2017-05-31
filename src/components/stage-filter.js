import React, { Component } from 'react';

class StageFilter extends Component {
    handleStageToggle = (e) => {
        this.props.onStageSelect(e.target.dataset.stage)
    }
    checked = (stage) => {
        return this.props.selectedStages.indexOf(stage) !== -1;
    }
    render() {
        let stageList = this.props.stages.map((stage, i) => {
            return (
                <div className="stage--item" key={i} data-stage={stage} onClick={this.handleStageToggle}>
                    <i className={"fa fa-check" + (this.checked(stage) ? '' : ' stage--hiddenicon')} aria-hidden="true" data-stage={stage}></i>
                    {stage}
                </div>
            );
        });
        return (
            <div className={"filter--stage" + (this.props.show ? ' stage--visible' : '')}>
                <div className="stage--title">Select stages</div>
                <div className="stage--list">
                    {stageList}
                </div>
            </div>
        );
    }
}

export default StageFilter;