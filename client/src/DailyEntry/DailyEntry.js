import React, { Component } from 'react';
import axios from 'axios';

class DailyEntry extends Component {
	state = {
		dailyEntry: {},
		profile: {}
	};
	componentWillMount() {
		// make sure we have the user's profile info for calling to the api, if not set it before calling api
		const { userProfile, setProfile } = this.props.auth;
		if (!userProfile) {
			setProfile((err, profile) => {
				this.setState({ profile }, this.getTodaysEntry);
			});
		} else {
			this.setState({ profile: userProfile }, this.getTodaysEntry);
		}
	}

	getTodaysEntry() {
		const { getAccessToken } = this.props.auth;
		const userId = this.state.profile.sub;
		const API_URL = 'http://localhost:4000/api';
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		axios
			.get(`${API_URL}/dailyentry/${userId}`, { headers })
			.then(response => this.setState({ dailyEntry: response.data }))
			.catch(error => console.log(error));
	}

	render() {
		const { dailyEntry } = this.state;
		return (
			<div className="container">
				<pre>{JSON.stringify(dailyEntry, null, 2)}</pre>
			</div>
		);
	}
}

export default DailyEntry;
