import React, { Component } from 'react';
import { Radio, FormGroup } from 'react-bootstrap';

class YesNoAnswer extends Component {
	constructor(props) {
		super(props);
		this.formChange = this.formChange.bind(this);
	}

	formChange(e) {
		const isAdd = e.target.value > 0 ? true : false;
		const { _id, maxDailyPoints } = this.props.question;
		console.log(isAdd);
		if (isAdd) {
			this.checked = true;
			this.props.handleChange(_id, maxDailyPoints, 'ADD');
		} else {
			this.checked = false;
			this.props.handleChange(_id, maxDailyPoints, 'SUBTRACT');
		}
	}

	render() {
		this.checked = this.props.question.currentValue > 0 ? true : false;
		const { questionTitle, description } = this.props.question;
		return (
			<div>
				<h1>{questionTitle}</h1>
				<p>{description}</p>
				<FormGroup>
					<Radio value="1" name={`${questionTitle}Radio`} checked={this.checked} onChange={this.formChange} inline>
						Yes
					</Radio>{' '}
					<Radio value="0" name={`${questionTitle}Radio`} checked={!this.checked} onChange={this.formChange} inline>
						No
					</Radio>{' '}
				</FormGroup>
			</div>
		);
	}
}

export default YesNoAnswer;
