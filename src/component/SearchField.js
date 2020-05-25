import React from "react";
import PropTypes from "prop-types";

import "./css/SearchField.css";

export default class SearchField extends React.Component {
	static propTypes = {
		onChange: PropTypes.func,
		submit: PropTypes.func,
		getSuggestions: PropTypes.func
	};

	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	handleKeyDown(event) {
		if (event.key === "Enter") {
			this.props.submit();
		}
	}

	render() {
		return (
			<div class="searchfield">
				<input class="searchfield-input" type="text"
					onChange={this.handleChange.bind(this)} placeholder="Sök på titel..." onKeyDown={this.handleKeyDown.bind(this)} autoComplete="off" spellCheck="false" autoFocus="true"/>
			</div>
		);
	}
}
