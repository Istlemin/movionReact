import React from "react";
import PropTypes from "prop-types";
import {AllHtmlEntities} from "html-entities";

import {TYPE_MAPPING,SERVICE_MAPPING,AGELIMIT_MAPPING} from "./displayMappings.js";

import {Rating} from "./Rating.js"
console.log(AllHtmlEntities);
const entities = new AllHtmlEntities();
console.log(entities);

export default class Result extends React.Component {
	static propTypes = {
		resultdata: PropTypes.object
	}
	render() {
		let resultdata = this.props.resultdata
		return (
			<li class="result" onClick={this.props.onClick}>
				<img width="100" alt={resultdata.name} src={resultdata.image} />

				<div class="name-description-container">
					<h3>{entities.decode(resultdata.name)}</h3>
					<div class="movie-type">{
						TYPE_MAPPING[resultdata.type]
					}
					</div>
					<p class="services">
						Finns på: {
							resultdata.services.split(",")
								.map((service) => { return SERVICE_MAPPING[service] || service }).join(", ")
						}
					</p>
					<p>{entities.decode(resultdata.description)}</p>
				</div>
				<div class="details">
					<Rating text={"Kritikerbetyg"} value={resultdata.criticsrating} />
					<Rating text={"Användarbetyg"} value={resultdata.userrating} />
					<p>IMDb-betyg: <span class="decimal-rating">{(resultdata.imdbrating!==-1)? resultdata.imdbrating:"okänt"}</span></p>
					<p>Utgivningsår: {resultdata.years[0]===-1?"okänt":resultdata.years.join("-")}</p>
					<p>Åldersgräns: {resultdata.agelimits.map(agelimit => AGELIMIT_MAPPING[agelimit]).join(", ")}</p>
				</div>
			</li>
		);
	}
}
