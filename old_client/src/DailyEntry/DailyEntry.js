import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import YesNoAnswer from './AnswerComponents/YesNoAnswer';
import Slider from './AnswerComponents/Slider';
import TextEntry from './AnswerComponents/TextEntry';
import LoadingSpinner from '../HelperComponents/LoadingSpinner';

class DailyEntry extends Component {
	// TODO: Pull out API_URL and put it in env
	constructor(props) {
		super(props);
		this.state = {
			entryQuestions: this.props.entryQuestions || [],
			date: this.props.date || null,
			entryId: this.props.entryId || '',
			profile: {}
		};
		this.getTodaysEntry = this.getTodaysEntry.bind(this);
		this.createQuestionList = this.createQuestionList.bind(this);
		this.handleAnswerChange = this.handleAnswerChange.bind(this);
		this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
		this.calcEntryTotal = this.calcEntryTotal.bind(this);
	}
	componentDidMount() {
		// make sure we have the user's profile info for calling to the api, if not set it before calling api
		const { userProfile, setProfile } = this.props.auth;
		if (!userProfile) {
			setProfile((err, profile) => {
				this.setState({ profile }, this.getTodaysEntry);
			});
		} else {
			this.setState({ profile: userProfile }, () => {
				if (this.state.date) {
					console.log('no data passed in, fetching it');
					this.getTodaysEntry;
				}
			});
		}
	}
	calcEntryTotal() {
		return this.state.entryQuestions.map(q => q.currentValue).reduce((a, b) => a + b);
	}

	getTodaysEntry() {
		const { getAccessToken } = this.props.auth;
		const userId = this.state.profile.sub;
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		axios
			.get(`/api/dailyentry/${userId}`, { headers })
			.then(response => {
				console.log(response);
				this.setState({
					entryQuestions: response.data.entryQuestions,
					date: response.data.date,
					entryId: response.data._id
				});
			})
			.catch(error => console.log(error));
	}
	handleAnswerSubmit() {
		const { getAccessToken } = this.props.auth;
		const API_URL = 'http://localhost:4000/api';
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		const data = this.state.entryQuestions;
		axios
			.post(`${API_URL}/dailyentry/${this.state.entryId}`, data, { headers })
			.then(response => console.log(response))
			.catch(error => console.log(error));
	}

	createQuestionList() {
		// const yesNoQuestions = this.state.entryQuestions
		// 	.map(question => question.questionType === 'YESNO')
		// 	.map(question => <YesNoAnswer key={question._id} handleChange={this.handleAnswerChange} question={question} />);
		// return yesNoQuestions;

		const questionList = this.state.entryQuestions.map(question => {
			switch (question.questionType) {
				case 'YESNO':
					return <YesNoAnswer key={question._id} handleChange={this.handleAnswerChange} question={question} />;
					break;
				case 'SLIDER':
					return <Slider key={question._id} handleChange={this.handleAnswerChange} question={question} />;
					break;
				case 'TEXTENTRY':
					return <TextEntry key={question._id} handleChange={this.handleAnswerChange} question={question} />;
					break;
			}
		});
		return questionList;
	}

	handleAnswerChange(answerId, newValue, userInput = '') {
		this.setState({
			entryQuestions: this.state.entryQuestions.map((question, index) => {
				if (question._id !== answerId) return question;
				return { ...question, currentValue: newValue, userInput: userInput };
			})
		});
	}

	render() {
		const { dailyEntry } = this.state;

		return (
			<div className="container">
				{this.state.entryQuestions.length ? (
					<div>
						<h2>{this.calcEntryTotal()}</h2>
						{this.createQuestionList()}
						<Button primary onClick={this.handleAnswerSubmit}>
							Save
						</Button>
						<Button>Cancel</Button>
					</div>
				) : (
					<LoadingSpinner />
				)}
			</div>
		);
	}
}

export default DailyEntry;

//
// const question = this.state.entryQuestions.find(question => question._id === answerId);
// const unmodifiedQuestions = this.state.entryQuestions.filter(question => question._id !== answerId);
//
// if (addOrSub === 'ADD') {
//   question.currentValue += changeInValue;
//   let updatedQuestions = [...unmodifiedQuestions, question];
//   this.setState(prevState => {
//     return {
//       entryQuestions: updatedQuestions,
//       entryTotal: prevState.entryTotal + changeInValue
//     };
//   });
// } else {
//   console.log('Subtracting: ', changeInValue);
// }
