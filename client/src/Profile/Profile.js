import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import LoadingSpinner from '../HelperComponents/LoadingSpinner';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

class Profile extends Component {
	// TODO: Switch to didmount method or use constructor
	constructor(props) {
		super(props);
		this.state = {
			authProfile: {},
			userProfile: {},
			challengeLevel: null
		};
		this.getUserProfile = this.getUserProfile.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log('did mount');
		const { userProfile, setProfile } = this.props.auth;
		if (!userProfile) {
			setProfile((err, authProfile) => {
				this.setState({ authProfile }, this.getUserProfile);
			});
		} else {
			this.setState({ authProfile: userProfile }, this.getUserProfile);
		}
	}

	handleChange = (e, { value }) =>
		this.setState({ challengeLevel: value }, () => {
			this.updateUserProfile();
		});

	getUserProfile() {
		const { getAccessToken } = this.props.auth;
		const headers = { Authorization: `Bearer ${getAccessToken()}` };

		axios
			.get(`/api/user/${this.state.authProfile.sub}`, { headers })
			.then(res => this.setState({ userProfile: res.data, challengeLevel: res.data.challengeFoodLevel }))
			.catch(err => console.log(err));
	}

	updateUserProfile(newLevel) {
		const { getAccessToken } = this.props.auth;
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		const data = { challengeFoodLevel: this.state.challengeLevel };
		axios.post(`/api/user/${this.state.userProfile._id}`, data, { headers });
	}

	render() {
		const { challengeFoodLevel, name } = this.state.userProfile;
		const { challengeLevel } = this.state;
		const options = [{ key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' }];
		return (
			<div className="container">
				{name ? (
					<div>
						<h1>{name}</h1>
						<Form>
							<Form.Group inline>
								<label>Size</label>
								<Form.Radio label="Kickstarter" value={1} checked={challengeLevel === 1} onChange={this.handleChange} />
								<Form.Radio label="Lifestyle" value={2} checked={challengeLevel === 2} onChange={this.handleChange} />
								<Form.Radio label="Performance" value={3} checked={challengeLevel === 3} onChange={this.handleChange} />
							</Form.Group>
							<div>
								<h1>Challenge Levels</h1>
								<h2>Kickstarter</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi officiis soluta nemo, consequatur
									excepturi molestias deleniti minus iste quas? Et, officia, cupiditate. Vel aspernatur doloremque
									accusamus! Iste quos, atque deleniti.
								</p>
								<h2>Lifestyle</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi officiis soluta nemo, consequatur
									excepturi molestias deleniti minus iste quas? Et, officia, cupiditate. Vel aspernatur doloremque
									accusamus! Iste quos, atque deleniti.
								</p>
								<h2>Performance</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi officiis soluta nemo, consequatur
									excepturi molestias deleniti minus iste quas? Et, officia, cupiditate. Vel aspernatur doloremque
									accusamus! Iste quos, atque deleniti.
								</p>
							</div>
						</Form>
					</div>
				) : (
					<LoadingSpinner />
				)}
			</div>
		);
	}
}

export default Profile;
