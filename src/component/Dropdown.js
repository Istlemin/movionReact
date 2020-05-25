import React from "react";
import PropTypes from "prop-types";

import "./css/Dropdown.css";

export default class Dropdown extends React.Component {
	static propTypes = {
		onChange: PropTypes.func,
		options: PropTypes.object,
		width: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedOption: props.selectedOption,
			isOpen: false,
		};
	}

	componentDidUpdate(prevProps){
		if(prevProps.selectedOption !== this.props.selectedOption){
			this.setState({
				selectedOption: this.props.selectedOption,
				isOpen: false,
			});
		}
	}

	setSelectedOption(newSelectedOption) {
		this.setState({
			selectedOption: newSelectedOption,
			isOpen: false
		});
		this.props.onChange(newSelectedOption);
	}

	toggle() {
		this.setState({
			selectedOption: this.state.selectedOption,
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div class="dropdown-menu-container">
				<div class="dropdown-menu">
					<div class="selected-option" onClick={this.toggle.bind(this)} style={{ width: this.props.width }}>
						<span class="text">{this.props.options[this.state.selectedOption]}</span>
						<span class="show-more" style={{ transform: this.state.isOpen?"rotate(180deg)":"rotate(0deg)" }}>▲</span>
					</div>
					<div class="options-container" style={
						{
							"max-height": this.state.isOpen ? 100 * Object.keys(this.props.options).length + "%" : "0",
							"width": this.props.width,
						}
					}>
						{
							Object.keys(this.props.options).filter(option => option !== this.state.selectedOption)
								.map(option => (
									<div key={option} class={option + " option"} onClick={this.setSelectedOption.bind(this, option)}>
										{this.props.options[option]}
									</div>
								))
						}
					</div>
				</div>
			</div>
		);
	}
}
