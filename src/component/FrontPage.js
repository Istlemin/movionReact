import React from "react";
import PropTypes from "prop-types";

import { SERVICE_MAPPING } from "./displayMappings.js"
import "./css/FrontPage.css";
import SearchField from "./SearchField";

export default class FrontPage extends React.Component {
	static propTypes = {
		changePage: PropTypes.func,
		getSuggestions: PropTypes.func
	};

	state = {
		activeServices: ["googleplay", "hbonordic", "itunes", "viaplay", "netflix", "sfanytime", "svtplay", "tv4play", "tv"],
		searchText: ""
	}

	search = () => {
		console.log(this.state.searchText);
		this.props.changePage("searchresults", {
			"name": this.state.searchText,
			"service": this.state.activeServices
		});
	};

	toggleService = (service) => {
		let newAciveServices = this.state.activeServices;
		let index = newAciveServices.indexOf(service);
		if (index === -1) {
			newAciveServices.push(service);
		} else {
			newAciveServices.splice(index, 1);
		}
		this.setState({
			activeServices: newAciveServices,
		})
	}

	updateSearchText = (newText) => {
		this.setState({
			searchText: newText
		});
	}

	render() {
		return (
			<div id="frontpage" class="page">
				<h1 class="header homeLink">Movion</h1>
				<p class="subtitle">Hjälper dig att hitta filmer och TV-serier</p>
				<p class="news"></p>
				<div class="search-field-row">
					<SearchField onChange={this.updateSearchText} submit={this.search} searchHandler={this.searchHandler} />
					<button class="button3 search" onClick={this.search}>?</button>
				</div>
				<div class="services-table table">
					{[["googleplay", "hbonordic", "itunes", "viaplay"],
					["netflix", "sfanytime", "svtplay", "tv4play"],
					["tv"]].map((serviceRow) => (
						<div class="table-row">
							{serviceRow.map((service) => (
								<div class="table-cell">
									<button class="button2" onClick={this.toggleService.bind(this, service)}>
										<input type="checkbox" checked={this.state.activeServices.indexOf(service) !== -1} class="activated-checkbox" id={"check" + service} disabled="disabled" />
										<label for={"check" + service}></label>
										<p>{SERVICE_MAPPING[service]}</p>
									</button>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}
