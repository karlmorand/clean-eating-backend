import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// import 'semantic-ui-css/semantic.min.css';
// import { makeMainRoutes } from './routes';
import App from './App';

// const routes = makeMainRoutes();

const routerApp = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(routerApp, document.getElementById('root'));
