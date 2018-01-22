import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = props => (
	<header>
		<nav>
			<button>
				<Link to="/">Home</Link>
			</button>
			{props.isAuthed ? <button onClick={props.logout}>Logout</button> : <button onClick={props.login}>Login</button>}

			<button>
				<Link to="/profile">Profile</Link>
			</button>
		</nav>
	</header>
);

export default Header;
