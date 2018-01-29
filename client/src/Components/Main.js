import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import Callback from '../Callback/Callback';
import Home from './Home';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const routeProps = this.props;

		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={() => <Profile profile={this.props.profile} />} />
					<Route
						path="/callback"
						render={() => {
							this.props.handleAuth();
							return <Callback />;
						}}
					/>
				</Switch>
			</div>
		);
	}
}

export default Main;
