import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './Slider.css';

class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.question.currentValue || 0
		};
		this.sliderChange = this.sliderChange.bind(this);
	}

	sliderChange(e) {
		const { _id } = this.props.question;
		this.setState({ value: e.target.value }, () => {
			this.props.handleChange(_id, parseInt(this.state.value));
		});
	}

	render() {
		const { maxDailyPoints, questionTitle, description } = this.props.question;
		return (
			<div>
				<h1>{questionTitle}</h1>
				<h3>{description}</h3>
				<h4>{this.state.value}</h4>
				<Form.Input
					className="slider"
					min={0}
					max={maxDailyPoints}
					name="slider"
					onChange={this.sliderChange}
					step={1}
					type="range"
					value={this.state.value}
				/>
			</div>
		);
	}
}

export default Slider;
