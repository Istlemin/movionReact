import React from "react";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown.js";
import Result from "./Result.js";
import search from "../logic/search.js";
import {sortResults} from "../logic/results.js";
import "./css/SearchResults.css";

const DEFAULT_SORT_DIRECTION = {
	"relevance": "descending",
	"userrating": "descending",
	"criticsrating": "descending",
	"imdbrating": "descending",
	"date": "descending",
	"year": "descending",
	"agelimit": "ascending",
	"name": "ascending",
}

export default class SearchResults extends React.Component {
	static propTypes = {
		changePage: PropTypes.func,
		query: PropTypes.object
	};

	state = {
		results: [],
		loading: true,
		sortBy: "relevance",
		sortDirection: "descending",
		maxShow: 10,
	}

	loadResults(){
		search(this.props.query).then((results) => {
			this.setState({
				loading: false,
				results: results
			})
		});
	}

	componentDidMount() {
		this.loadResults();
	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.query) !== JSON.stringify(this.props.query)) {
			this.setState({
				loading: true,
				results: [],
			})
			this.loadResults();
		}
	}

	sortByChange(newSortBy) {
		this.setState({
			sortBy: newSortBy,
			sortDirection: DEFAULT_SORT_DIRECTION[newSortBy],
		})
	}

	sortDirectionChange(newSortDirection) {
		this.setState({
			sortDirection: newSortDirection,
		})
	}

	onscroll(e){
		let distanceToBottom = (e.target.scrollHeight-(e.target.scrollTop+e.target.offsetHeight));
		if(distanceToBottom <= 300){
			this.setState({
				maxShow: this.state.maxShow+10
			});
		}
	}

	openMoviePage(resultdata){
		this.props.changePage("viewmovie",{
			name:resultdata.name,
			type:resultdata.type
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<div>Loading...</div>
			);
		} else {
			sortResults(this.state.results,this.state.sortBy,this.state.sortDirection, this.props.query.name);
			console.log(this.state.sortDirection)
			return (
				<div id="results-page" onScroll={this.onscroll.bind(this)} class="page">
					<div class="top-row">
						<h1 class="small-header home-link">Movion</h1>
						<div class="sort-container">
							<p class="sort-title">Sortera efter:</p>
							<Dropdown onChange={this.sortByChange.bind(this)} options={{
								"relevance": "Relevans",
								"userrating": "Användarbetyg",
								"criticsrating": "Kritikerbetyg",
								"imdbrating": "IMDb-betyg",
								"date": "Inkommetdatum",
								"year": "Utgivningsår",
								"agelimit": "Åldersgräns",
								"name": "Namn",
							}} selectedOption={this.state.sortBy} width="170px" />
						</div>
						<div class="sort-direction-container">
							<p class="sort-direction-title">Ordning:</p>
							<Dropdown onChange={this.sortDirectionChange.bind(this)} options={{
								"ascending": "Stigande",
								"descending": "Fallande",
							}} selectedOption={this.state.sortDirection} width="170px" />
						</div>
						<div class="search-info">
							<p class="number-of-movies">Antal träffar: {this.state.results.length}</p>
						</div>
						<button class="back-button" onClick={()=>{window.history.back();}} style={{ "outline": "none" }}>➜</button>
					</div>
					<div class="noMovies"></div>
					<div class="results-list">
						{
							this.state.results.map((resultdata, index) => {
								if(index>=this.state.maxShow) return (<></>);
								else return <Result key={index} onClick={this.openMoviePage.bind(this,resultdata)} resultdata={resultdata} />;
							})
						}
					</div>
				</div>
			);
		}
	}
}
