import { getEditDistance } from "./utils.js";

export function sortResults(results, sortBy, sortDirection, searchedName) {
    const COMPARE_FUNCTIONS = {
        "relevance": (a, b) => {
            if (
                a.episodeName && !b.episodeName) {
                return -1;
            } else if (!a.episodeName && b.episodeName) {
                return 1;
            } else {
                return getEditDistance(searchedName, b.name) - getEditDistance(searchedName, a.name);
            }
        },
        "userrating": (a, b) => (a.userrating-b.userrating),
        "criticsrating": (a, b) => (a.criticsrating-b.criticsrating),
        "imdbrating": (a, b) => (a.imdbrating-b.imdbrating),
        "date": (a, b) => ((new Date(a.date)).getTime()-(new Date(b.date)).getTime()),
        "year": (a, b) => (a.years[0]-b.years[0]),
        "agelimit": (a, b) => (a.agelimits[0]-b.agelimits[0]),
        "name": (a,b) => (a.name>b.name?1:-1),
    }

    results.sort(COMPARE_FUNCTIONS[sortBy]);
    if (sortDirection === "descending") {
        results.reverse();
    }
}

