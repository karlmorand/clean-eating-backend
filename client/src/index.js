import ReactDOM from 'react-dom';
import './index.css';
// import 'semantic-ui-css/semantic.min.css';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));
