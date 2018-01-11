import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

class TextEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textBody: this.props.question.userInput || ''
		};
		this.textChange = this.textChange.bind(this);
	}
	textChange(e, data) {
		const { _id, maxDailyPoints } = this.props.question;
		this.setState({ textBody: data.value }, () => {
			if (this.state.textBody.length) {
				this.props.handleChange(_id, maxDailyPoints, this.state.textBody);
			} else {
				this.props.handleChange(_id, 0, '');
			}
		});
	}

	render() {
		const { questionTitle, description } = this.props.question;
		return (
			<div>
				<h1>{questionTitle}</h1>
				<h3>{description}</h3>
				<Form>
					<TextArea
						onChange={this.textChange}
						value={this.state.textBody}
						autoHeight
						placeholder="Write your journal entry here"
					/>
				</Form>
			</div>
		);
	}
}

export default TextEntry;
