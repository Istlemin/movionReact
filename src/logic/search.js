import { queryToUrl } from "./utils.js"

const SEARCH_URL = "http://movion.se/server/search.php?";

export default async function search(query) {
	const response = await fetch(SEARCH_URL + queryToUrl(query));
	let searchresults = await response.json();
	searchresults.forEach(movie => {
		movie.userrating = movie.userrating === null ? -1 : parseFloat(movie.userrating);
		movie.criticsrating = movie.criticsrating === null ? -1 : parseFloat(movie.criticsrating);
		movie.imdbrating = movie.imdbrating === null ? -1 : parseFloat(movie.imdbrating);
		movie.years = movie.years.map(x=>(x==null?-1:parseInt(x)));
	});
	console.log(searchresults);
	return searchresults;
}
