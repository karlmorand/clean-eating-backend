import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('App props: ', this.props);
		this.goTo = this.goTo.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}
	goTo(route) {
		this.props.history.replace(`/${route}`);
	}
	login() {
		this.props.auth.login();
	}
	logout() {
		this.props.auth.logout();
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		return (
			<div className="App">
				<button onClick={() => this.goTo('home')}>Home</button>
				{!isAuthenticated() && <button onClick={this.login}>Login</button>}
				{isAuthenticated() && <button onClick={this.logout}>Logout</button>}
			</div>
		);
	}
}

export default App;
