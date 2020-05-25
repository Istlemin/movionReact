import React from "react";
import PropTypes from "prop-types";

import { getMovieData } from "../logic/getMovieData.js";
import { TYPE_MAPPING, SERVICE_MAPPING, AGELIMIT_MAPPING } from "./displayMappings.js";
import { formatDuration } from "../logic/utils.js";
import { Rating } from "./Rating.js"

import "./css/ViewMovie.css";


export default class ViewMovie extends React.Component {
	static propTypes = {
		query: PropTypes.object,
	};

	state = {
		movieData: [],
		loading: true
	}

	loadMovie() {
		getMovieData(this.props.query.name, this.props.query.type).then((movieData) => {
			console.log(movieData);
			this.setState({
				loading: false,
				movieData: movieData
			});
		});
	}

	componentDidMount() {
		this.loadMovie();
	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.query) !== JSON.stringify(this.props.query)) {
			this.setState({
				loading: true,
				movieData: [],
			})
			this.loadMovie();
		}
	}

	render() {
		let movieData = this.state.movieData;

		if (this.state.loading) {
			return (
				<div>Loading...</div>
			);
		} else {
			return (
				<div id="view-movie-page" class="page">
					<button class="back-button" onClick={()=>{window.history.back();}}>➜</button>
					<h1 class="small-header home-link">Movion</h1>
					<p class="movie-type">{TYPE_MAPPING[movieData.type]}</p>
					<h1 class="title">{movieData.name}</h1>
					<div class="left-column">
						<img alt="Filmomslag" class="poster" src={movieData.image} />
					</div>
					<div class="movie-details">
						<div class="details-top">
							<div class="details-left">
								<Rating text={"Kritikerbetyg"} value={movieData.criticsrating} />
								<Rating text={"Användarbetyg"} value={movieData.userrating} />
								<p>
									<span class="weight600">IMDb-betyg:</span>
									<span class="decimal-rating">{(movieData.imdbrating !== -1) ? movieData.imdbrating : "okänt"}</span>
								</p>
								<p>
									<span class="weight600">Åldersgräns:</span> 
									{movieData.agelimits.map(agelimit => AGELIMIT_MAPPING[agelimit]).join(", ")}
								</p>
								<p><span class="weight600">Längd:</span> {formatDuration(movieData.duration)}</p>
							</div>
							<div class="details-right">
								<p><span class="weight600">Produktionsland:</span> {movieData.country}</p>
								<p><span class="weight600">Utgivningsår:</span> {movieData.years[0] === -1 ? "okänt" : movieData.years.join("-")}</p>
								<p><span class="weight600">Genrer:</span> {movieData.genres.map(g => (g[0].toUpperCase() + g.slice(1))).join(", ")}</p>
							</div>
						</div>
						<div class="details-bottom">
							<p>
								<span class="weight600">Regissör:</span> {movieData.directors.join(", ")||"Okänt"}</p>
							<p><span class="weight600">Skådespelare:</span> {movieData.actors.slice(0, Math.min(movieData.actors.length, 5)).join(", ")||"Okänt"}</p>
						</div>
					</div>
					<div class="center-column">
						<p class="description">{movieData.description}</p>
						<div class="services"><p class="subtitle">Finns tillgänglig på:</p>
							{movieData.services.map(service => (
								<div class="button3">{SERVICE_MAPPING[service.name]}</div>
							))}
						</div>
					</div>
				</div>
			);
		}
	}
}
