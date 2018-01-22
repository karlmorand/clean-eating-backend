import React, { Component } from 'react';

class Profile extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>Profile page {this.props.profile && this.props.profile.name}</div>;
	}
}

export default Profile;
