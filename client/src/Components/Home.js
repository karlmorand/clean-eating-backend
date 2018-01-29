import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './home.css';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<h1>Broccoli</h1>
				<Image src="../images/broccoli_raw.png" />
				<h2>CrossFit 513 United</h2>
				<h2>Clean Eating Challenge</h2>
			</div>
		);
	}
}

export default Home;
