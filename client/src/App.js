import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

class App extends Component {
	goTo(route) {
		this.props.history.replace(`/${route}`);
	}

	login() {
		this.props.auth.login();
	}
	// getDailyEntry() {
	// 	const { getAccessToken } = this.props.auth;
	// 	const API_URL = 'http://localhost:4000/api';
	// 	const headers = { Authorization: `Bearer ${getAccessToken()}` };
	// 	console.log(headers);
	// 	axios
	// 		.get(`${API_URL}/dailyentry`, { headers })
	// 		.then(res => {
	// 			console.log('Response from server: ', res);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }
	getDailyEntry() {
		const { getAccessToken } = this.props.auth;
		const API_URL = 'http://localhost:4000/api';
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		console.log('HEADERS: ', headers);
		axios
			.get(`${API_URL}/dailyentry`, { headers })
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
							<a onClick={this.goTo.bind(this, 'home')}>Auth0 - React</a>
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
							<Button bsStyle="primary" className="btn-margin" onClick={this.renewToken.bind(this)}>
								Renew Token
							</Button>
						)}
						{isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.logout.bind(this)}>
								Log Out
							</Button>
						)}
						{isAuthenticated() && (
							<Button bsStyle="primary" className="btn-margin" onClick={this.getDailyEntry.bind(this)}>
								Get Daily Entry
							</Button>
						)}
					</Navbar.Header>
				</Navbar>
			</div>
		);
	}
}

export default App;
