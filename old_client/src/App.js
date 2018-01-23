import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('App constructor props: ', this.props);
		this.state = {
			authProfile: {}
		};
		this.userSetup = this.userSetup.bind(this);
	}
	componentDidMount() {
		//when app first loads isAuthenticated is returning false and thus the userSetup function is never called...perhaps try ignoring the issue and just call userSetup from componentDidMount without any of the if block checks...ejall
		const { isAuthenticated, userProfile, setProfile } = this.props.auth;
		if (!userProfile && isAuthenticated()) {
			console.log('no profile');
			setProfile((err, authProfile) => {
				this.setState({ authProfile }, this.userSetup);
			});
		} else {
			console.log('found profile');
			this.setState({ authProfile: userProfile }, this.userSetup);
		}
	}

	goTo(route) {
		this.props.history.replace(`/${route}`);
	}

	login() {
		this.props.auth.login();
	}

	userSetup() {
		console.log('user setup function');
		const { getAccessToken, userProfile } = this.props.auth;
		const userId = userProfile.sub;
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		console.log(headers);
		axios
			.post(`api/usersetup/${userId}`, null, { headers })
			.then(response => console.log(response))
			.catch(error => console.log(error));
	}
	logout() {
		this.props.auth.logout();
	}

	renewToken() {
		this.props.auth.renewToken();
	}

	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<div>
				<Navbar fluid>
					<Navbar.Header>
						<Navbar.Brand>
							<a onClick={this.goTo.bind(this, 'home')}>Clean Eating Challenge</a>
						</Navbar.Brand>
						<Button bsStyle="primary" className="btn-margin" onClick={this.goTo.bind(this, 'home')}>
							Home
						</Button>
						{!isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.login.bind(this)}>
								Log In
							</Button>
						)}
						{isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.goTo.bind(this, 'profile')}>
								Profile
							</Button>
						)}
						{isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.logout.bind(this)}>
								Log Out
							</Button>
						)}
						{isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.goTo.bind(this, 'dailyentry')}>
								Get today's entry
							</Button>
						)}
					</Navbar.Header>
				</Navbar>
			</div>
		);
	}
}

export default App;
