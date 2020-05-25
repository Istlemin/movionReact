import React from "react";
import FrontPage from "./FrontPage";
import SearchResults from "./SearchResults";
import ViewMovie from "./ViewMovie";
import Footer from "./Footer";

import "./css/App.css";

export default class App extends React.Component {
	state = {
		page: window.location.hash.substr(1),
		query: {}
	};

	changePage = (newPage, query) => {
		let newLocation = "#" + newPage;
		if (query) {
			newLocation += "?";
			Object.keys(query).forEach((key) => {
				newLocation += key + "=";
				if(typeof query[key] === "object"){
					newLocation += encodeURIComponent(JSON.stringify(query[key]));
				} else {
					newLocation += query[key];
				}
				newLocation += "&";
			});
			newLocation = newLocation.slice(0, -1)
		}
		window.location = newLocation
	};

	parseHashString = (hashString) => {
		let page = "";
		let query = {};
		if (hashString.indexOf("?") !== -1) {
			page = hashString.substring(1, hashString.indexOf("?"));
			let queryString = hashString.substring(hashString.indexOf("?") + 1);
			queryString.split("&").forEach((keyValString) => {
				let key = keyValString.split("=")[0];
				let value = decodeURIComponent(keyValString.split("=")[1]);
				if(value[0]==="{"||value[0]==="["){
					value = JSON.parse(value);
				}
				query[key] = value;
			});
		} else {
			page = hashString.substring(1);
		}
		return [page, query]
	}

	hashchange = () => {
		let hashString = window.location.hash;
		if (hashString === "") {
			this.changePage("frontpage", {});
			return;
		}
		const [page, query] = this.parseHashString(hashString);
		this.setState({
			page: page,
			query: query,
		});
		console.log(page);
		console.log(query);
	}

	componentDidMount() {
		window.addEventListener("hashchange", this.hashchange.bind(this), false);
		this.hashchange();
	}

	componentWillUnmount() {
		window.removeEventListener("hashchange", this.hashchange.bind(this), false);
	}

	render() {
		return (
			<>
				{
					{
						'frontpage': <FrontPage changePage={this.changePage} query={this.state.query}/>,
						'searchresults': <SearchResults changePage={this.changePage} query={this.state.query}/>,
						'viewmovie': <ViewMovie changePage={this.changePage} query={this.state.query}/>,
					}[this.state.page]
				}
				<Footer />
			</>
		);
	}
}
