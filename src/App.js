import React, { Component } from 'react';
import Header from './components/header.js';
import DateBar from './components/date-bar.js';
import ActList from './components/act-list.js';
import StageFilter from './components/stage-filter.js';
import GenreFilter from './components/genre-filter.js';
import Footer from './components/footer.js';
import './css/app.css';

const summerfestDates = [
    new Date('2017-06-28T00:00:00-05:00'),
    new Date('2017-06-29T00:00:00-05:00'),
    new Date('2017-06-30T00:00:00-05:00'),
    new Date('2017-07-01T00:00:00-05:00'),
    new Date('2017-07-02T00:00:00-05:00'),
    new Date('2017-07-04T00:00:00-05:00'),
    new Date('2017-07-05T00:00:00-05:00'),
    new Date('2017-07-06T00:00:00-05:00'),
    new Date('2017-07-07T00:00:00-05:00'),
    new Date('2017-07-08T00:00:00-05:00'),
    new Date('2017-07-09T00:00:00-05:00')
];
const now = new Date();

class App extends Component {
    constructor(props) {
        super(props);

        this.handleSelectedDayChange = this.handleSelectedDayChange.bind(this);
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.handleStageChange = this.handleStageChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);

        let selectedDay = (now >= summerfestDates[0] ? this.formatDate(now) : summerfestDates[0]);
        this.state = {
            selectedDay: this.formatDate(selectedDay),
            selectedDayNum: "1",
            filters: {
                headliners: false,
                stages: [
                    "JoJo's Martini Lounge",
                    "Kohl's Captivation Station",
                    "Uline Warehouse",
                    "Gruber Law Offices Sportszone",
                    "Northwestern Mutual Children's Theater & Playzone ",
                    "Johnson Controls World Sound Stage",
                    "BMO Harris Pavilion",
                    "Briggs & Stratton Big Backyard",
                    "Harley-Davidson Roadhouse",
                    "U.S. Cellular Connection Stage",
                    "Miller Lite Oasis",
                    "American Family Insurance Amphitheater"
                ],
                stageShow: false,
                genres: [
                    "Cover",
                    "Family",
                    "Sports",
                    "Rock",
                    "Folk",
                    "Blues",
                    "Country",
                    "Pop",
                    "EDM",
                    "Soul"
                ],
                genreShow: false,
                picks: false,
                favorites: false
            },
            allStages: [
                "JoJo's Martini Lounge",
                "Kohl's Captivation Station",
                "Uline Warehouse",
                "Gruber Law Offices Sportszone",
                "Northwestern Mutual Children's Theater & Playzone ",
                "Johnson Controls World Sound Stage",
                "BMO Harris Pavilion",
                "Briggs & Stratton Big Backyard",
                "Harley-Davidson Roadhouse",
                "U.S. Cellular Connection Stage",
                "Miller Lite Oasis",
                "American Family Insurance Amphitheater"
            ],
            allGenres: [
                "Cover",
                "Family",
                "Sports",
                "Rock",
                "Folk",
                "Blues",
                "Country",
                "Pop",
                "EDM",
                "Soul"
            ],
            acts: [],
            visibleActs: []
        };
    }
    filterActs = () => {
        let filters = this.state.filters;
        let matchingActs = (act) => {
            let valid = true;
            if (filters.headliners) {
                if (!act.headliner) {
                    valid = false;
                }
            }
            if (filters.picks) {
                if (!act.recommended) {
                    valid = false;
                }
            }
            if (filters.stages.length !== 12) {
                if (filters.stages.indexOf(act.stage) === -1) {
                    valid = false;
                }
            }
            if (filters.genres.length !== 10) {
                if (filters.genres.indexOf(act.genre) === -1) {
                    valid = false;
                }
            }
            return valid;
        }
        this.setState({visibleActs: this.state.acts.filter(matchingActs)});
    }
    getActsForDay = (dayNum) => {
        fetch('data/schedule-' + dayNum + '.json').then((resp) => resp.json()
        ).then(function(data) {
            this.setState({"acts": JSON.parse(data).data});
            this.filterActs();
        }.bind(this)).catch((error) => {
            console.log('failed to load: ' + dayNum, error.message);
        });
        window.scrollTo(0, 0);
    }
    componentDidMount = () => {
        this.getActsForDay(this.state.selectedDayNum);
    }
    formatDate = (d) => {
        return (d.getMonth()+1) + '/' + d.getDate();
    }
    handleSelectedDayChange = (day, dayNum) => {
        this.setState({
            "selectedDay": day,
            "selectedDayNum": dayNum
        });
        this.getActsForDay(dayNum);
    }
    handleFiltersChange = (filter, status) => {
        let filters = this.state.filters;
        filters[filter] = status;
        this.setState({ filters: filters });
        this.filterActs();
    }
    handleStageChange = (stage) => {
        let selectedStages = this.state.filters.stages;
        let pos = selectedStages.indexOf(stage);
        if (pos !== -1) {
            selectedStages.splice(pos, 1);
        } else {
            selectedStages.push(stage);
        }
        this.handleFiltersChange('stages', selectedStages);
    }
    handleGenreChange = (genre) => {
        let selectedGenres = this.state.filters.genres;
        let pos = selectedGenres.indexOf(genre);
        if (pos !== -1) {
            selectedGenres.splice(pos, 1);
        } else {
            selectedGenres.push(genre);
        }
        this.handleFiltersChange('genres', selectedGenres);
    }
    render() {
        return (
            <div className="summerfest">
                <Header />
                <DateBar
                    dates={summerfestDates}
                    selectedDay={this.state.selectedDay}
                    onSelectedDayChange={this.handleSelectedDayChange} />
                <ActList
                    acts={this.state.visibleActs} />
                <StageFilter
                    stages={this.state.allStages}
                    selectedStages={this.state.filters.stages}
                    show={this.state.filters.stageShow}
                    onStageSelect={this.handleStageChange} />
                <GenreFilter
                    genres={this.state.allGenres}
                    selectedGenres={this.state.filters.genres}
                    show={this.state.filters.genreShow}
                    onGenreSelect={this.handleGenreChange} />
                <Footer
                    filters={this.state.filters}
                    onFiltersChange={this.handleFiltersChange} />
            </div>
        );
    }
}

export default App;
