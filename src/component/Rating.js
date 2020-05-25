import React from "react";
import PropTypes from "prop-types";

export class Rating extends React.Component {
	static propTypes = {
		text: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
		onClick: PropTypes.func
	}
	render() {
		if (this.props.value !== -1) {
			return (
				<p>
					{this.props.text}:
					<br />
					<span class="stars critics-rating">
						<span style={
							{
								width: (this.props.value * 10) + "%"
							}
						}></span>
					</span>
					<span class="decimal-rating">{(this.props.value / 2).toFixed(1)}</span>
				</p>
			);
		} else {
			return (
				<p>
					{this.props.text}: okänt;
				</p>
			);
		}
	}
}