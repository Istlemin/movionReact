import { queryToUrl } from "./utils.js"

const GET_MOVIE_URL = "http://movion.se/server/getMovie.php?";

export async function getMovieData(name,type){
	const response = await fetch(GET_MOVIE_URL + queryToUrl({
        name:name,
        type:type
    }));
    let moviedata = await response.json();
    moviedata.userrating = moviedata.userrating === null ? -1 : parseFloat(moviedata.userrating);
    moviedata.criticsrating = moviedata.criticsrating === null ? -1 : parseFloat(moviedata.criticsrating);
    moviedata.imdbrating = moviedata.imdbrating === null ? -1 : parseFloat(moviedata.imdbrating);
    moviedata.duration = moviedata.duration === null ? -1 : parseFloat(moviedata.duration);
    moviedata.years = moviedata.years.map(x=>(x==null?-1:parseInt(x)));
    return moviedata;
}