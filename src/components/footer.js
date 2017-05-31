import React, { Component } from 'react';

class Footer extends Component {
    handleFilterToggle = (e) => {
        let value = false;
        let filter = e.target.dataset.filter;
        if (filter === "headliners") {
            value = !this.props.filters.headliners;
        } else if (filter === "stages") {
            filter = 'stageShow'
            value = !this.props.filters.stageShow;
        } else if (filter === "genres") {
            filter = 'genreShow';
            value = !this.props.filters.genreShow;
        } else if (filter === "picks") {
            value = !this.props.filters.picks;
        } else if (filter === "favorites") {
            value = !this.props.filters.favorites;
        }
        this.props.onFiltersChange(filter, value);
    }
    render() {
        return (
            <div className="footer">
                <div className={"footer--item" + (this.props.filters.headliners ? ' footer--active' : '')} onClick={this.handleFilterToggle} data-filter="headliners">
                    <i className="footer--icon fa fa-microphone" aria-hidden="true" data-filter="headliners"></i>
                    <div className="footer--name">Headliners</div>
                </div>
                <div className={"footer--item" + (this.props.filters.stages.length !== 12 ? ' footer--active' : '')} onClick={this.handleFilterToggle} data-filter="stages">
                    <i className="footer--icon fa fa-map-marker" aria-hidden="true" data-filter="stages"></i>
                    <div className="footer--name">Stages</div>
                </div>
                <div className={"footer--item" + (this.props.filters.genres.length !== 10 ? ' footer--active' : '')} onClick={this.handleFilterToggle} data-filter="genres">
                    <i className="footer--icon fa fa-music" aria-hidden="true" data-filter="genres"></i>
                    <div className="footer--name">Genres</div>
                </div>
                <div className={"footer--item" + (this.props.filters.picks ? ' footer--active' : '')} onClick={this.handleFilterToggle} data-filter="picks">
                    <i className="footer--icon fa fa-user" aria-hidden="true" data-filter="picks"></i>
                    <div className="footer--name">Piet's Picks</div>
                </div>
                <div className={"footer--item" + (this.props.filters.favorites ? ' footer--active' : '')} onClick={this.handleFilterToggle} data-filter="favorites">
                    <i className="footer--icon fa fa-star" aria-hidden="true" data-filter="favorites"></i>
                    <div className="footer--name">Your Picks</div>
                </div>
            </div>
        );
    }
}

export default Footer;