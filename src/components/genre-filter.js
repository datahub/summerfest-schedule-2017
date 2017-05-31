import React, { Component } from 'react';

class GenreFilter extends Component {
    handleGenreToggle = (e) => {
        this.props.onGenreSelect(e.target.dataset.genre)
    }
    checked = (genre) => {
        return this.props.selectedGenres.indexOf(genre) !== -1;
    }
    render() {
        let genreList = this.props.genres.map((genre, i) => {
            return (
                <div className="genre--item" key={i} data-genre={genre} onClick={this.handleGenreToggle}>
                    <i className={"fa fa-check" + (this.checked(genre) ? '' : ' genre--hiddenicon')} aria-hidden="true" data-genre={genre}></i>
                    {genre}
                </div>
            );
        });
        return (
            <div className={"filter--genre" + (this.props.show ? ' genre--visible' : '')}>
                <div className="genre--title">Select genres</div>
                <div className="genre--list">
                    {genreList}
                </div>
            </div>
        );
    }
}

export default GenreFilter;